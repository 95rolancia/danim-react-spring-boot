package com.pd.danim.Controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Form.Request.LoveRequest;
import com.pd.danim.Form.Response.LoveCheckResponse;
import com.pd.danim.Service.LoveService;

import io.swagger.annotations.Api;

@RestController
@Api(tags = "팔로우", value = "follow contoller")
public class LoveController {

	@Autowired
	private LoveService loveService;

	@PostMapping("/love")
	public ResponseEntity<LoveCheckResponse> addLove(@RequestBody LoveRequest loveRequest,
			HttpServletRequest httpServletRequest) {

		String message = loveService.addLove(loveRequest, httpServletRequest);
		LoveCheckResponse loveCheckResponse = new LoveCheckResponse();
		if (message.equals("success")) {
			loveCheckResponse.setIsLove(true);
			loveCheckResponse.setMessage("success");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse,HttpStatus.OK);
		} else if (message.equals("doesn't exist")) {
			loveCheckResponse.setIsLove(false);
			loveCheckResponse.setMessage("fail");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse,HttpStatus.BAD_REQUEST);
		}	else {
			loveCheckResponse.setIsLove(false);
			loveCheckResponse.setMessage("server error");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse,HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	@DeleteMapping("/love")
	public ResponseEntity<LoveCheckResponse> deleteLove(@RequestBody LoveRequest loveRequest,
			HttpServletRequest httpServletRequest) {

		String message = loveService.deleteLove(loveRequest, httpServletRequest);
		LoveCheckResponse loveCheckResponse = new LoveCheckResponse();
		if (message.equals("success")) {
			loveCheckResponse.setIsLove(true);
			loveCheckResponse.setMessage("success");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse,HttpStatus.OK);
		} else if (message.equals("doesn't exist")) {
			loveCheckResponse.setIsLove(false);
			loveCheckResponse.setMessage("doesn't exist");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse,HttpStatus.BAD_REQUEST);
		}	else {
			loveCheckResponse.setIsLove(false);
			loveCheckResponse.setMessage("server error");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse,HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

}
