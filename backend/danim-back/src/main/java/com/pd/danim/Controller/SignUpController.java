package com.pd.danim.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Form.Request.EmailRequest;
import com.pd.danim.Form.Request.NicknameRequest;
import com.pd.danim.Form.Request.SignUpRequest;
import com.pd.danim.Service.SignUpService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;

@Api(tags = "SignUp" ,value = "signup controller")
@RestController
public class SignUpController {
	
	@Autowired
	private SignUpService signUpService;
	
	@ApiOperation(tags ="중복 검사", value ="이메일 검사 및 메일 전송", notes = "이메일 유효성 검사 후 중복 검사 진행 뒤 인증 메일을 전송합니다.")
	@ApiResponse(code = 200, message ="success")
	@PostMapping("/duplicate/email")
	public ResponseEntity<String> checkEmail(@RequestBody EmailRequest email) {
		
		String userId = email.getUserId();		
		
		if (!signUpService.checkValidityEmail(userId)) {
			System.out.println("유효성 검사 실패");
			return new ResponseEntity<String>("invalid", HttpStatus.BAD_REQUEST);
		}

		if (!signUpService.checkDuplicateEmail(userId)) {
			System.out.println("중복 검사 실패");
			return new ResponseEntity<String>("duplicate", HttpStatus.CONFLICT);
		}

		signUpService.sendVerificationMail(userId);
		
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
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
			}else if(result==400) {
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

}
