package com.pd.danim.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Form.Response.SearchByAreaResponse;
import com.pd.danim.Form.Response.SearchByNicknameResponse;
import com.pd.danim.Service.SearchService;

@RestController
@RequestMapping("/search")
public class SearchController {
	
	@Autowired
	private SearchService searchService;

	@GetMapping("/nickname/{nickname}")
	public ResponseEntity<List<SearchByNicknameResponse>> searchNickname(@PathVariable("nickname")String nickname){
		
		List<SearchByNicknameResponse> responses = searchService.searchByNickName(nickname);
		
		return new ResponseEntity<List<SearchByNicknameResponse>>(responses,HttpStatus.OK);
	}
	
	@GetMapping("/area/{area}")
	public ResponseEntity<List<SearchByAreaResponse>> searchArea(@PathVariable("area")String area){
		
		List<SearchByAreaResponse> responses = searchService.searchByArea(area);
		
		return new ResponseEntity<List<SearchByAreaResponse>>(responses,HttpStatus.OK);
	} 
	
}
