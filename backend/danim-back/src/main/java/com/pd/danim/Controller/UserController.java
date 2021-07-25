package com.pd.danim.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Dto.SignUpForm;
import com.pd.danim.Service.SignUpService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private SignUpService signUpService;
	
	
	@PostMapping("/singup")
	public ResponseEntity<String> signUp(@RequestBody SignUpForm signUpForm){
		
		try {
			signUpService.signUpUser(signUpForm);
		}catch(Exception e) {
			e.printStackTrace();
			System.out.println("에러 발생");
		}
		return  new ResponseEntity<String>("sss",HttpStatus.OK);
	}
	
	@GetMapping("/signout")
	public ResponseEntity<String> logout(){
		return  new ResponseEntity<String>("sasdasdasd",HttpStatus.OK);
	}
	
	@GetMapping("/signin")
	public ResponseEntity<String> test1(){
		return  new ResponseEntity<String>("aaa",HttpStatus.OK);
	}
}
