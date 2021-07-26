package com.pd.danim.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Dto.SignUpForm;
import com.pd.danim.Service.SignUpService;

@RestController
public class UserController {

	@Autowired
	private SignUpService signUpService;
	
	//이메일 검사 및 메일 전송
	@PostMapping("/duplicate/email")
	public ResponseEntity<String> checkEmail(@RequestBody String userId){
		
		
		//유효성 검사
		if(!signUpService.checkValidityEmail(userId)) {
			return  new ResponseEntity<String>("invalid",HttpStatus.OK);
		}
		
		//중복 검사
		if(!signUpService.checkDuplicateEmail(userId)) {
			return  new ResponseEntity<String>("duplicate",HttpStatus.OK);
		}
		
		//인증 메일 전송
		signUpService.sendVerificationMail(userId);
		
		
		return  new ResponseEntity<String>("success",HttpStatus.OK);
	}
	
	//닉네임 중복 검사
	@PostMapping("/duplicate/nickname")
	public ResponseEntity<String> checkNickname(@RequestBody String nickname){
		
		if(!signUpService.checkNickname(nickname)) {
			return new ResponseEntity<String>("duplicate",HttpStatus.OK);
		}
		
		
		return  new ResponseEntity<String>("success",HttpStatus.OK);
	}
	
	
	//이메일 인증
	@PostMapping("/auth/email")
	public ResponseEntity<String> verifyEmail(@RequestBody SignUpForm info){
		
		if(!signUpService.verifyEmail(info.getKey(),info.getUserId())) {
			return new ResponseEntity<String>("fail",HttpStatus.OK);
		}
		
		
		return  new ResponseEntity<String>("success",HttpStatus.OK);
	}
	
	
	
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody SignUpForm signUpForm){
		try {
			signUpService.signUpUser(signUpForm);
		}catch(Exception e) {
			System.out.println("회원 가입 에러 발생");
			e.printStackTrace();
			return  new ResponseEntity<String>("error",HttpStatus.BAD_REQUEST);
		}
		return  new ResponseEntity<String>("signup-success",HttpStatus.OK);
	}
	
	@GetMapping("/auth/signout")
	public ResponseEntity<String> logout(){
		return  new ResponseEntity<String>("signout-success",HttpStatus.OK);
	}
	
	@GetMapping("/auth/signin")
	public ResponseEntity<String> test1(){
		return  new ResponseEntity<String>("signin-success",HttpStatus.OK);
	}
	
}
