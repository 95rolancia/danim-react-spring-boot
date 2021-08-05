package com.pd.danim.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Dto.StoryForm;
import com.pd.danim.Service.StoryService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags ="Story" , value="Story controller")
@RequestMapping("/story")
@RestController
public class StoryController {
	
	
	@Autowired
	StoryService storyService;
	
	@ApiOperation(tags ="스토리", value ="스토리 작성", notes = "스토리를 작성 혹은 임시 저장합니다")
	@PostMapping
	public ResponseEntity<String> postStory(@RequestBody StoryForm input) {
		
		
		
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	
	@ApiOperation(tags ="스토리", value ="스토리 조회", notes = "스토리 내용을 조회합니다")
	@GetMapping("/{storyno}")
	public ResponseEntity<String> getStory() {
		//조회
		
		
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	
	@ApiOperation(tags ="스토리", value ="스토리 수정", notes = "스토리 내용을 수정합니다")
	@PutMapping("/{storyno}")
	public ResponseEntity<String> putStory(@RequestBody String temp) {
		//본인 검증 후 수정
		
		
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@ApiOperation(tags ="스토리", value ="스토리 삭제", notes = "스토리를 삭제합니다")
	@DeleteMapping("/{storyno}")
	public ResponseEntity<String> deleteStory(@RequestBody String temp) {
		//본인 검증 후 삭제
		
		
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	
	
}
