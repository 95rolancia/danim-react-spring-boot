package com.pd.danim.Controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.Form.Request.EmailRequest;
import com.pd.danim.Form.Request.InterestRequest;
import com.pd.danim.Form.Request.PasswordResetRequest;
import com.pd.danim.Form.Request.SignInRequest;
import com.pd.danim.Form.Response.MeResponse;
import com.pd.danim.Form.Response.SignInResponse;
import com.pd.danim.Service.DanimPasswordService;
import com.pd.danim.Service.InterestService;
import com.pd.danim.Service.LoginService;
import com.pd.danim.Service.RefreshJwtTokenService;
import com.pd.danim.Service.SignOutService;
import com.pd.danim.Service.SignUpService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

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
	
	@ApiOperation(tags ="인증", value="로그인", notes="아이디와 비밀번호로 로그인을 합니다")
	@PostMapping("/auth/signin")
	public ResponseEntity<SignInResponse> signIn(@RequestBody SignInRequest signInForm, HttpServletResponse httpServletResponse) {
		SignInResponse response = new SignInResponse();		

		try {
			DanimId danim = loginService.loginUser(signInForm.getUserId(), signInForm.getPassword());
			
			if(loginService.isDeleted(danim))
				return new ResponseEntity<SignInResponse>(response, HttpStatus.UNAUTHORIZED);
			
			response =  loginService.generateResponse(httpServletResponse, danim);

		} catch (Exception e) {
			return new ResponseEntity<SignInResponse>(response, HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<SignInResponse>(response, HttpStatus.OK);
	}

	@ApiOperation(tags ="인증", value="로그아웃", notes="로그아웃을 진행하며 refresh Token을 제거합니다")
	@PostMapping("/auth/signout")
	public ResponseEntity<String> logout(HttpServletRequest httpServletRequest) {
		
		signOutService.signOut(httpServletRequest);
		
		return new ResponseEntity<String>("signout-success", HttpStatus.OK);
	}
	
	
	@ApiOperation(tags="인증", value="비밀번호 초기화 메일 전송 요청", notes="아이디(이메일주소)를 입력하면 입력하신 이메일로 키 값을 전송해 줌")
	@PostMapping("/auth/reset")
	public ResponseEntity<String> sendResetPasswrod(@RequestBody EmailRequest input){
		
		String userId = input.getUserId();
		
		if(!signUpService.checkValidityEmail(userId)) {
			return new ResponseEntity<String>("invalid", HttpStatus.BAD_REQUEST);
		}
		
		if(signUpService.checkDuplicateEmail(userId)) {
			return new ResponseEntity<String>("not authorized", HttpStatus.FORBIDDEN);
		}
		
		danimPasswordService.sendResetPassword(userId);
	
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@ApiOperation(tags="인증", value="비밀번호 찾기(초기화)", notes="비밀번호를 초기화 합니다")
	@PostMapping("/auth/resetpwd")
	public ResponseEntity<String> resetPasswrod(@RequestBody PasswordResetRequest input){
		
		String userId = input.getUserId();
		String password = input.getPassword();
		String key = input.getKey();
		
		if(!signUpService.checkValidityEmail(userId)) {
			return new ResponseEntity<String>("invalid", HttpStatus.BAD_REQUEST);
		}
		
		if(signUpService.checkDuplicateEmail(userId)) {
			return new ResponseEntity<String>("not authorized", HttpStatus.FORBIDDEN);
		}
		
		danimPasswordService.resetPassword(userId,password,key);
	
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@ApiOperation(tags="인증", value="사용자 정보 반환", notes="사용자의 정보를 반환합니다")
	@GetMapping("/auth/me")
	public ResponseEntity<MeResponse> getMyInfo(HttpServletRequest httpServletRequest){
		
		final MeResponse me = loginService.getUserInfo(httpServletRequest);
		if(me == null) {
			return new ResponseEntity<MeResponse>(me, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<MeResponse>(me, HttpStatus.OK);
	}
	
	
	@ApiOperation(tags="관심지역", value="관심지역 설정", notes="사용자의 관심지역을 설정해 줌")
	@PostMapping("/interest")
	public ResponseEntity<String> setInterest(@RequestBody InterestRequest input, HttpServletRequest httpServletReq){
		
		if(input.getAreas().length <= 0) {
			return new ResponseEntity<String>("underflow", HttpStatus.BAD_REQUEST);
		}else if(input.getAreas().length > 3) {
			return new ResponseEntity<String>("overflow", HttpStatus.BAD_REQUEST);
		}
		
		interestService.setInterest(input, httpServletReq);		
		
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@ApiOperation(tags="인증", value="토큰 재발급", notes="사용자의 토큰을 재발급해줌")
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
