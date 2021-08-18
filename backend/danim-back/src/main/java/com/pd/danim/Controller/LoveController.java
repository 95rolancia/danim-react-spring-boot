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
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = "좋아요", value = "love contoller")
public class LoveController {

	@Autowired
	private LoveService loveService;

	@ApiOperation(tags = "좋아요 생성", value = "좋아요 수 증가 및 관계 설정")
	@PostMapping("/love")
	public ResponseEntity<LoveCheckResponse> addLove(@RequestBody LoveRequest loveRequest,
			HttpServletRequest httpServletRequest) {

		String message = loveService.addLove(loveRequest, httpServletRequest);
		LoveCheckResponse loveCheckResponse = new LoveCheckResponse();
		if (message.equals("success")) {
			loveCheckResponse.setIsLove(true);
			loveCheckResponse.setMessage("success");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse, HttpStatus.OK);
		} else if (message.equals("doesn't exist")) {
			loveCheckResponse.setIsLove(false);
			loveCheckResponse.setMessage("fail");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse, HttpStatus.BAD_REQUEST);
		} else if (message.equals("mine")) {
			loveCheckResponse.setIsLove(false);
			loveCheckResponse.setMessage("mine");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse, HttpStatus.BAD_REQUEST);
		} else {
			loveCheckResponse.setIsLove(false);
			loveCheckResponse.setMessage("server error");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse, HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	@ApiOperation(tags = "좋아요 제거", value = "좋아요 수 감소 및 관계 설정")
	@DeleteMapping("/love")
	public ResponseEntity<LoveCheckResponse> deleteLove(@RequestBody LoveRequest loveRequest,
			HttpServletRequest httpServletRequest) {

		String message = loveService.deleteLove(loveRequest, httpServletRequest);
		LoveCheckResponse loveCheckResponse = new LoveCheckResponse();
		if (message.equals("success")) {
			loveCheckResponse.setIsLove(false);
			loveCheckResponse.setMessage("success");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse, HttpStatus.OK);
		} else if (message.equals("doesn't exist")) {
			loveCheckResponse.setIsLove(true);
			loveCheckResponse.setMessage("doesn't exist");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse, HttpStatus.BAD_REQUEST);
		} else {
			loveCheckResponse.setIsLove(true);
			loveCheckResponse.setMessage("server error");
			return new ResponseEntity<LoveCheckResponse>(loveCheckResponse, HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

}
