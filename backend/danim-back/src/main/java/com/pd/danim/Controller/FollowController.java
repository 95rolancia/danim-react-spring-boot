package com.pd.danim.Controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Dto.FollowRequestForm;
import com.pd.danim.Service.FollowService;

import io.swagger.annotations.Api;

@Api(tags = "ALL" , value = "follow contoller")
@RestController
public class FollowController {
	
	@Autowired
	private FollowService followService;
	
	@PostMapping("/follow")
	public ResponseEntity<String> addFollow(@RequestBody FollowRequestForm followForm, HttpServletRequest httpServletRequest){
		boolean bl = followService.setFollow(followForm, httpServletRequest);
		if(bl) {
			return new ResponseEntity<String>("follow succuess",HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("follow fail",HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
