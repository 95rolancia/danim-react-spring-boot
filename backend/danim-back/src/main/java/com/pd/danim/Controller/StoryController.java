package com.pd.danim.Controller;

import java.time.LocalDateTime;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pd.danim.Form.Request.PhotoUploadRequest;
import com.pd.danim.Form.Request.StoryRequest;
import com.pd.danim.Form.Response.PhotoResponse;
import com.pd.danim.Service.AuthService;
import com.pd.danim.Service.StoryService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags = "Story", value = "Story controller")
@RequestMapping("/story")
@RestController
public class StoryController {

	@Autowired
	private StoryService storyService;

	@Autowired
	private AuthService authService;

	@ApiOperation(tags = "사진", value = "사진 업로드", notes = "사진을 업로드합니다")
	@PostMapping("/upload")
	public ResponseEntity<PhotoResponse> photo(@RequestPart("file") MultipartFile file,
			@RequestPart("latitude") String latitude, @RequestPart("longtitude") String longtitude,
			@RequestPart("date") String date, HttpServletRequest httpServletReq) {
		
		PhotoResponse response = new PhotoResponse();
		PhotoUploadRequest photoReq = new PhotoUploadRequest();
		

		response = storyService.uploadPhoto(file,latitude,longtitude,date,httpServletReq);
		
		if(response == null)
			return new ResponseEntity<PhotoResponse>(response, HttpStatus.BAD_REQUEST);

		return new ResponseEntity<PhotoResponse>(response, HttpStatus.OK);
	}

	@ApiOperation(tags = "스토리", value = "스토리 작성", notes = "스토리를 작성 혹은 임시 저장합니다")
	@PostMapping
	public ResponseEntity<String> postStory(@RequestBody StoryRequest input, HttpServletRequest httpServletReq) {

		if(!storyService.writeStory(input, httpServletReq)) {
			return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@ApiOperation(tags = "스토리", value = "스토리 조회", notes = "스토리 내용을 조회합니다")
	@GetMapping("/{storyno}")
	public ResponseEntity<String> getStory() {
		// 조회

		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@ApiOperation(tags = "스토리", value = "스토리 수정", notes = "스토리 내용을 수정합니다")
	@PutMapping("/{storyno}")
	public ResponseEntity<String> putStory(@RequestBody String temp) {
		// 본인 검증 후 수정

		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@ApiOperation(tags = "스토리", value = "스토리 삭제", notes = "스토리를 삭제합니다")
	@DeleteMapping("/{storyno}")
	public ResponseEntity<String> deleteStory(@RequestBody String temp) {
		// 본인 검증 후 삭제

		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

}
