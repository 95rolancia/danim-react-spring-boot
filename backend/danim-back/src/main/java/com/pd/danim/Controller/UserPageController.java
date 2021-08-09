package com.pd.danim.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Form.Response.UserPageResponse;
import com.pd.danim.Service.UserPageService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;

@Api(tags ="UserPage" , value="userPage controller")
@RestController
public class UserPageController {
	@Autowired
	private UserPageService userPageService;
	
	@ApiOperation(tags ="회원 페이지", value ="회원 페이지 접근", notes = "닉네임으로 회원 페이지에 접근합니다")
	@ApiResponse(code = 200, message ="success")
	@GetMapping("/users/{nickname}")
	public ResponseEntity<UserPageResponse> checkEmail(@PathVariable("nickname") String nickname) {
		

		UserPageResponse response;
		
		response = userPageService.userPage(nickname);
		
		if(response == null)
			return new ResponseEntity<UserPageResponse>(response, HttpStatus.NOT_FOUND);

		return new ResponseEntity<UserPageResponse>(response, HttpStatus.OK);
	}
	
}
