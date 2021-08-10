package com.pd.danim.Controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Form.Request.PasswordRequest;
import com.pd.danim.Form.Request.ProfileRequest;
import com.pd.danim.Form.Request.UserEditRequest;
import com.pd.danim.Form.Response.PhotoResponse;
import com.pd.danim.Service.UserEditService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags = "회원 정보 수정", value = "UserEdit Controller")
@RequestMapping("/account")
@RestController
public class UserEditController {

	@Autowired
	private UserEditService userEditService;

	@ApiOperation(value = "프로필 사진 업로드", notes = "프로필 사진을 업로드합니다")
	@PostMapping("/avatar")
	public ResponseEntity<String> profile(@RequestBody ProfileRequest profileReq, HttpServletRequest httpServletReq) {
		PhotoResponse response = new PhotoResponse();

		String filename = userEditService.uploadProfile(profileReq);
		if (filename == null) {
			return new ResponseEntity<String>("", HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<String>(filename, HttpStatus.OK);
	}

	@ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정합니다")
	@PutMapping("/info")
	public ResponseEntity<String> information(@RequestBody UserEditRequest userEditReq) {

		if(userEditService.setUserInfo(userEditReq)) {

			return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		}
		return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
	}

	@ApiOperation(value = "비밀번호 변경", notes = "비밀 번호를 변경합니다")
	@PutMapping("/pwd")
	public ResponseEntity<String> password(@RequestBody PasswordRequest pwdReq) {

		if (userEditService.setPassword(pwdReq)) {

			return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
	}

}
