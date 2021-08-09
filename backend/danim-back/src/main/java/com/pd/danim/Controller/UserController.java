package com.pd.danim.Controller;

import java.util.Collection;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.EmailRequest;
import com.pd.danim.Form.Request.InterestRequest;
import com.pd.danim.Form.Request.NicknameRequest;
import com.pd.danim.Form.Request.SignInRequest;
import com.pd.danim.Form.Request.SignUpRequest;
import com.pd.danim.Form.Response.SignInResponse;
import com.pd.danim.Service.DanimPasswordService;
import com.pd.danim.Service.InterestService;
import com.pd.danim.Service.LoginService;
import com.pd.danim.Service.RefreshJwtTokenService;
import com.pd.danim.Service.SignOutService;
import com.pd.danim.Service.SignUpService;
import com.pd.danim.Util.CookieUtil;
import com.pd.danim.Util.JwtUtil;
import com.pd.danim.Util.RedisUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;

//@CrossOrigin(origins = "http://192.168.0.5:3000")
@Api(tags ="ALL" , value="user controller")
@RestController
public class UserController {

	@Autowired
	private SignUpService signUpService;

	@Autowired
	private LoginService loginService;
	
	@Autowired
	private DanimPasswordService danimPasswordService;
	
	@Autowired
	private SignOutService signOutService;
	
	@Autowired
	private InterestService interestService;
	
	@Autowired
	private RefreshJwtTokenService refreshJwtTokenService;
	
	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private CookieUtil cookieUtil;

	@Autowired
	private RedisUtil redisUtil;

	
	
	// 이메일 검사 및 메일 전송
	@ApiOperation(tags ="중복 검사", value ="이메일 검사 및 메일 전송", notes = "이메일 유효성 검사 후 중복 검사 진행 뒤 인증 메일을 전송합니다.")
	@ApiResponse(code = 200, message ="success")
	@PostMapping("/duplicate/email")
	public ResponseEntity<String> checkEmail(@RequestBody EmailRequest email) {
		
		String userId = email.getUserId();		
		
		// 유효성 검사
		if (!signUpService.checkValidityEmail(userId)) {
			System.out.println("유효성 검사 실패");
			return new ResponseEntity<String>("invalid", HttpStatus.BAD_REQUEST);
		}

		// 중복 검사
		if (!signUpService.checkDuplicateEmail(userId)) {
			System.out.println("중복 검사 실패");
			return new ResponseEntity<String>("duplicate", HttpStatus.CONFLICT);
		}

		// 인증 메일 전송
		signUpService.sendVerificationMail(userId);
		
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}

	// 닉네임 중복 검사
	@ApiOperation(tags ="중복 검사", value = "닉네임 중복 검사", notes="닉네임 중복을 검사합니다")
	@PostMapping("/duplicate/nickname")
	public ResponseEntity<String> checkNickname(@RequestBody NicknameRequest input) {
		String nickname = input.getNickname();
		
		if(!signUpService.checkValidityNickname(nickname)){
			return new ResponseEntity<String>("invalid", HttpStatus.BAD_REQUEST);
		}
		
		if (!signUpService.checkNickname(nickname)) {
			return new ResponseEntity<String>("duplicate", HttpStatus.CONFLICT);
		}

		return new ResponseEntity<String>("success", HttpStatus.OK);
	}

	// 이메일 인증
	@ApiOperation(tags ="인증", value ="이메일 인증", notes="메일로 받은 key 값을 입력하여 이메일을 인증합니다")
	@PostMapping("/auth/email")
	public ResponseEntity<String> verifyEmail(@RequestBody SignUpRequest info) {

		if (!signUpService.verifyEmail(info.getKey(), info.getUserId())) {
			return new ResponseEntity<String>("fail", HttpStatus.FORBIDDEN);
		}

		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@ApiOperation(tags ="인증", value="회원 가입", notes="회원 가입을 진행합니다")
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody SignUpRequest signUpForm) {
		int result=400;
		try {
			result = signUpService.signUpUser(signUpForm);			
			
			if(result==200) {
				return new ResponseEntity<String>("success", HttpStatus.OK);
			}
			
			else if(result==400) {
				return new ResponseEntity<String>("invalid", HttpStatus.BAD_REQUEST);
			}else if(result==403) {
				return new ResponseEntity<String>("not authorized", HttpStatus.FORBIDDEN);
			}else if(result==409) {
				return new ResponseEntity<String>("duplicate", HttpStatus.CONFLICT);
			}
						
			
		} catch (Exception e) {
			System.out.println("회원 가입 에러 발생");
			e.printStackTrace();
			return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
		}
						
		return new ResponseEntity<String>("signup-success", HttpStatus.OK);
	}


	
	@ApiOperation(tags ="인증", value="로그인", notes="아이디와 비밀번호로 로그인을 합니다")
	@PostMapping("/auth/signin")
	public ResponseEntity<SignInResponse> signIn(@RequestBody SignInRequest signInForm, HttpServletRequest req,
			HttpServletResponse res) {
		SignInResponse response = new SignInResponse();		

		try {
			DanimId danim = loginService.loginUser(signInForm.getUserId(), signInForm.getPassword());

			final String token = jwtUtil.generateToken(danim);
			final String refreshJwt = jwtUtil.generateRefreshToken(danim);
			Cookie accessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, token);
			Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);
			redisUtil.setDataExpire(danim.getId()+"jwt", refreshJwt, JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
//			res.addCookie(accessToken);
			res.addCookie(refreshToken);
//			res.setHeader("Set-Cookie","SameSite=None; Secure;");
			response.setAccessToken(accessToken.getValue());
//			response.setRefreshToken(refreshToken.getValue());
			
			Collection<String> headers = res.getHeaders(HttpHeaders.SET_COOKIE);
			for (String header : headers) {
				res.setHeader(HttpHeaders.SET_COOKIE, header+"; " + "SameSite=None; Secure");
			}


		} catch (Exception e) {
//			e.printStackTrace();
			return new ResponseEntity<SignInResponse>(response, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<SignInResponse>(response, HttpStatus.OK);

	}

	@ApiOperation(tags ="인증", value="로그아웃", notes="로그아웃을 진행하며 refresh Token을 제거합니다")
	@PostMapping("/auth/signout")
	public ResponseEntity<String> logout(HttpServletRequest httpServletRequest) {
//		String id = principal.getName();
//		System.out.println(id);
		signOutService.signOut(httpServletRequest);
		

		return new ResponseEntity<String>("signout-success", HttpStatus.OK);
	}
	
	
	@ApiOperation(tags="인증", value="비밀번호 찾기(초기화)", notes="아이디(이메일주소)를 입력하면 입력하신 이메일로 임시 비밀번호를 전송해 줌")
	@PostMapping("/auth/reset")
	public ResponseEntity<String> resetPasswrod(@RequestBody EmailRequest input){
		
		String userId = input.getUserId();
		
		if(!signUpService.checkValidityEmail(userId)) {
			return new ResponseEntity<String>("invalid", HttpStatus.BAD_REQUEST);
		}
		
		if(signUpService.checkDuplicateEmail(userId)) {
			return new ResponseEntity<String>("not authorized", HttpStatus.FORBIDDEN);
		}
		
		danimPasswordService.resetPassword(userId);
	
		
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@ApiOperation(tags="인증", value="사용자 정보 반환", notes="사용자의 정보를 반환합니다")
	@GetMapping("/auth/me")
	public ResponseEntity<User> getMyInfo(HttpServletRequest httpServletRequest){
//		,HttpServletResponse httpServletResponse
//		int status = httpServletResponse.getStatus();
//		System.out.println("---------------------------------");
//		System.out.println("response의 status는 "+ status);
//		User testUser = new User();
//		if(status==403) {
//			return new ResponseEntity<User>(testUser,HttpStatus.UNAUTHORIZED);
//		}
		
		final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
		String id = jwtUtil.getUsername(requestTokenHeader);
		final User user = loginService.getUserInfo(id);
		if(user == null) {
			return new ResponseEntity<User>(user, HttpStatus.BAD_REQUEST);
		}
		
		System.out.println(user.getAge());
		
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	
	@ApiOperation(tags="관심지역", value="관심지역 설정", notes="사용자의 관심지역을 설정해 줌")
	@PostMapping("/interest")
	public ResponseEntity<String> setInterest(HttpServletRequest httpServletRequest, @RequestBody InterestRequest input){
		
		final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
		String id = jwtUtil.getUsername(requestTokenHeader);
		System.out.println(id);
		if(input.getAreas().length <= 0) {
			return new ResponseEntity<String>("underflow", HttpStatus.BAD_REQUEST);
		}
		
		else if(input.getAreas().length > 3)
			return new ResponseEntity<String>("overflow", HttpStatus.BAD_REQUEST);
		
		
		interestService.setInterest(input);		
		
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
//	@CrossOrigin(withCredentials = "true") => 이 옵션이 먹지 않는다. 그래서 WebConfiguration 건드려야할 듯
//	to follow next steps, see the WebConfiguration.java's comments
	@PostMapping("/silent-refresh")
	public ResponseEntity<SignInResponse> refreshJwt(HttpServletRequest request, HttpServletResponse response){
		
		Cookie[] cookies = request.getCookies();
		
		SignInResponse signInRespose = refreshJwtTokenService.refreshJwt(request, response);
		
		for (Cookie cookie : cookies) {
			if(cookie.getName().equals("refreshToken")) {
				return new ResponseEntity<SignInResponse>(signInRespose,HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<SignInResponse>(signInRespose,HttpStatus.BAD_REQUEST);
		
	}
	
	
	
	
}
