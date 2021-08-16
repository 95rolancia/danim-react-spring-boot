package com.pd.danim.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Form.Request.CommentDeleteRequest;
import com.pd.danim.Form.Request.CommentRequest;
import com.pd.danim.Form.Response.CommentResponse;
import com.pd.danim.Service.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController {

	@Autowired
	private CommentService commentService;
	
	
	@PostMapping
	public ResponseEntity<String> writeComment(@RequestBody CommentRequest request, HttpServletRequest httpServletReq){
		
		
		int response = commentService.writeComment(request, httpServletReq);
		
		if(response == 401)
			return new ResponseEntity<String>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		else if(response == 404)
			return new ResponseEntity<String>("NOT FOUND", HttpStatus.NOT_FOUND);
		
		
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		
	}
	
	@DeleteMapping
	public ResponseEntity<String> deleteComment(@RequestBody CommentDeleteRequest request, HttpServletRequest httpServletReq){
				
	int response = commentService.deleteComment(request, httpServletReq);
		
		if(response == 401)
			return new ResponseEntity<String>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
		else if(response == 404)
			return new ResponseEntity<String>("NOT FOUND", HttpStatus.NOT_FOUND);
		
		
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		
	}
	
	@GetMapping("/{storyno}")
	public ResponseEntity<List<CommentResponse>> getComments(@PathVariable("storyno") long storyNo, HttpServletRequest httpServletReq){
		
	
		
		List<CommentResponse> comments = commentService.getComments(storyNo, httpServletReq);
	
		return new ResponseEntity<List<CommentResponse>>(comments, HttpStatus.OK);
		
	}
	
	
	
	
}
