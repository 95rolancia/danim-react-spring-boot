package com.pd.danim.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.Getter;

@RestController
@RequestMapping("/user")
public class UserController {

	@GetMapping("/singup")
	public ResponseEntity<String> login(){
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
