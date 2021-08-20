package com.pd.danim.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Form.Response.MyPopularPhotoResponse;
import com.pd.danim.Form.Response.MyPopularResponse;
import com.pd.danim.Form.Response.StoryResponse;
import com.pd.danim.Service.HomeService;

@RestController
@RequestMapping("/home")
public class HomeController {
	
	@Autowired
	private HomeService homeService;
	
	@GetMapping("/myPopular")
	public ResponseEntity<List<MyPopularResponse>> myPopularStory(HttpServletRequest httpServletRequest){
		homeService.getMyPopularStory(httpServletRequest);
		
		List<MyPopularResponse> storyResponses = homeService.getMyPopularStory(httpServletRequest);
		return new ResponseEntity<List<MyPopularResponse>>(storyResponses,HttpStatus.OK);
	}
	
	

	@GetMapping("/popular")
	public ResponseEntity<List<StoryResponse>> popularStory(){
		
		List<StoryResponse> storyResponses = homeService.getPopularStory();
		
		return new ResponseEntity<List<StoryResponse>>(storyResponses,HttpStatus.OK);
	}
	
	@GetMapping("/myPopular/photo")
	public ResponseEntity<List<MyPopularPhotoResponse>> myPopularPhoto(HttpServletRequest httpServletRequest){
		
		
		List<MyPopularPhotoResponse> responses =homeService.getMyPopularPhoto(httpServletRequest);
		
		return new ResponseEntity<List<MyPopularPhotoResponse>>(responses,HttpStatus.OK);
	}
}
