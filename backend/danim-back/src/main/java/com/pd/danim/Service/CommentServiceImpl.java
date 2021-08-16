package com.pd.danim.Service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.Comment;
import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.Story;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.CommentDeleteRequest;
import com.pd.danim.Form.Request.CommentRequest;
import com.pd.danim.Form.Response.CommentResponse;
import com.pd.danim.Repository.CommentRepository;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.StoryRepository;
import com.pd.danim.Util.JwtUtil;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	DanimRepository danimRepo;
	
	@Autowired
	StoryRepository storyRepo;
	
	@Autowired
	CommentRepository commentRepo;
	
	@Autowired
	JwtUtil jwtUtil;
	
	public int writeComment(CommentRequest req, HttpServletRequest httpServletReq) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		
		DanimId danim = danimRepo.findById(userId);
		Story story = storyRepo.findByStoryNo(req.getStoryNo());
		
		if(story == null)
			return 404;
		
		if(danim == null)
			return 401;
		
		Comment comment = new Comment();
		
		comment.setContent(req.getContent());
		comment.setStory(story);
		comment.setUser(danim.getUser());
		
		commentRepo.save(comment);		
		
		return 200;
	}
	
	public int deleteComment(CommentDeleteRequest req, HttpServletRequest httpServletReq) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		
		DanimId danim = danimRepo.findById(userId);
		Story story = storyRepo.findByStoryNo(req.getStoryNo());
		
		if(story == null)
			return 404;
		
		if(danim == null)
			return 401;
		
		
		Comment comment = commentRepo.findByCommentNo(req.getCommentNo());
		
		comment.setDeleted(true);
		
		commentRepo.save(comment);
		
		return 200;
	}
	
	public List<CommentResponse> getComments(long storyNo, HttpServletRequest httpServletReq){
		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		
		DanimId danim = danimRepo.findById(userId);
		User user = danim.getUser();
		if(danim == null)
			return null;
		
		
		Story story = storyRepo.findByStoryNo(storyNo);
		
		List<Comment> commentList = commentRepo.findAllByStoryAndDeleted(story, false);		
		List<CommentResponse> comments = new ArrayList();
		
		for(Comment comment : commentList) {
			CommentResponse commentRes = new CommentResponse();
			commentRes.setCommentNo(comment.getCommentNo());
			commentRes.setContent(comment.getContent());
			commentRes.setNickname(comment.getUser().getNickname());
			commentRes.setProfile(comment.getUser().getProfile());
			if(commentRes.getNickname().equals(user.getNickname())){
				commentRes.setMine(true);
			}
			comments.add(commentRes);
		}
		
		
		return comments;
	}
	
	
}
