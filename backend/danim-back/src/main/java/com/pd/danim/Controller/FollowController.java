package com.pd.danim.Controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Form.Request.FollowRequest;
import com.pd.danim.Service.FollowService;

import io.swagger.annotations.Api;

@Api(tags = "팔로우", value = "follow contoller")
@RestController
public class FollowController {

	@Autowired
	private FollowService followService;

	@PostMapping("/follow")
	public ResponseEntity<String> addFollow(@RequestBody FollowRequest followForm,
			HttpServletRequest httpServletRequest) {
		String str = followService.setFollow(followForm, httpServletRequest);
		if (str.equals("success")) {
			return new ResponseEntity<String>("follow succuess", HttpStatus.OK);
		} else if (str.equals("exists")) {
			return new ResponseEntity<String>("follow user already exists", HttpStatus.BAD_REQUEST);
		} else if (str.equals("null")) {
			return new ResponseEntity<String>("follow user doesn't exist", HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<String>("server error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/follow")
	public ResponseEntity<String> deleteFollow(@RequestBody FollowRequest followForm,
			HttpServletRequest httpServletRequest) {
		String str = followService.deleteFollow(followForm, httpServletRequest);
		if (str.equals("success")) {
			return new ResponseEntity<String>("follow unconnected", HttpStatus.OK);
		} else if (str.equals("fail")) {
			return new ResponseEntity<String>("follow relationship doesn't exist", HttpStatus.BAD_REQUEST);
		} else if (str.equals("null")) {
			return new ResponseEntity<String>("follow user doesn't exist", HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<String>("server error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
