package com.pd.danim.Service;

import java.time.LocalDateTime;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.StoryRequest;
import com.pd.danim.Form.Response.PhotoResponse;

public interface StoryService {

	boolean writeStory(StoryRequest input, HttpServletRequest httpServletReq);
	boolean modifyStory(StoryRequest input, long storyno);
	boolean getStory(long storyno);
	boolean getStories(User user);
	boolean deleteStory(long storyno);
	PhotoResponse uploadPhoto(MultipartFile file,String latitude, String longtitude, LocalDateTime date, HttpServletRequest httpServletReq);
	
}
