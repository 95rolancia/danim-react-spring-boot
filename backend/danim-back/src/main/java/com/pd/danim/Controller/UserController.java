package com.pd.danim.Controller;

import java.security.Principal;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Dto.DanimId;
import com.pd.danim.Dto.SignInForm;
import com.pd.danim.Dto.SignInResponse;
import com.pd.danim.Dto.SignUpForm;
import com.pd.danim.Dto.emailDTO;
import com.pd.danim.Dto.nicknameDTO;
import com.pd.danim.Service.DanimPasswordService;
import com.pd.danim.Service.LoginService;
import com.pd.danim.Service.SignUpService;
import com.pd.danim.Util.CookieUtil;
import com.pd.danim.Util.JwtUtil;
import com.pd.danim.Util.RedisUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;

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
	private JwtUtil jwtUtil;

	@Autowired
	private CookieUtil cookieUtil;

	@Autowired
	private RedisUtil redisUtil;

	// 이메일 검사 및 메일 전송
	@ApiOperation(tags ="중복 검사", value ="이메일 검사 및 메일 전송", notes = "이메일 유효성 검사 후 중복 검사 진행 뒤 인증 메일을 전송합니다.")
	@ApiResponse(code = 200, message ="success")
	@PostMapping("/duplicate/email")
	public ResponseEntity<String> checkEmail(@RequestBody emailDTO email) {
		
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
	public ResponseEntity<String> checkNickname(@RequestBody nicknameDTO input) {
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
	public ResponseEntity<String> verifyEmail(@RequestBody SignUpForm info) {

		if (!signUpService.verifyEmail(info.getKey(), info.getUserId())) {
			return new ResponseEntity<String>("fail", HttpStatus.FORBIDDEN);
		}

		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@ApiOperation(tags ="인증", value="회원 가입", notes="회원 가입을 진행합니다")
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody SignUpForm signUpForm) {
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
		
		
		System.out.println(result);
		
		return new ResponseEntity<String>("signup-success", HttpStatus.OK);
	}


	
	@ApiOperation(tags ="인증", value="로그인", notes="아이디와 비밀번호로 로그인을 합니다")
	@PostMapping("/auth/signin")
	public ResponseEntity<SignInResponse> signIn(@RequestBody SignInForm signInForm, HttpServletRequest req,
			HttpServletResponse res) {
		SignInResponse response = new SignInResponse();		

		try {
			DanimId danim = loginService.loginUser(signInForm.getUserId(), signInForm.getPassword());

			final String token = jwtUtil.generateToken(danim);
			final String refreshJwt = jwtUtil.generateRefreshToken(danim);
			Cookie accessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, token);
			Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);
			redisUtil.setDataExpire(danim.getId()+"jwt", refreshJwt, JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
			res.addCookie(accessToken);
			res.addCookie(refreshToken);
			response.setAccessToken(accessToken.getValue());
			response.setRefreshToken(refreshToken.getValue());


		} catch (Exception e) {
//			e.printStackTrace();
			return new ResponseEntity<SignInResponse>(response, HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<SignInResponse>(response, HttpStatus.OK);

	}

	@ApiOperation(tags ="인증", value="로그아웃", notes="로그아웃을 진행하며 refresh Token을 제거합니다")
	@PostMapping("/auth/signout")
	public ResponseEntity<String> logout(Principal principal) {
		String id = principal.getName();
		return new ResponseEntity<String>("signout-success", HttpStatus.OK);
	}
	
	
	@ApiOperation(tags="인증", value="비밀번호 찾기(초기화)", notes="아이디(이메일주소)를 입력하면 입력하신 이메일로 임시 비밀번호를 전송해 줌")
	@PostMapping("/auth/reset")
	public ResponseEntity<String> resetPasswrod(@RequestBody emailDTO input){
		
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
	
}
