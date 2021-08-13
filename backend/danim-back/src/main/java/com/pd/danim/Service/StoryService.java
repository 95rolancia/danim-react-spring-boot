package com.pd.danim.Service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.StoryRequest;
import com.pd.danim.Form.Response.PhotoResponse;
import com.pd.danim.Form.Response.StoryDetailResponse;
import com.pd.danim.Form.Response.StoryResponse;

public interface StoryService {

	boolean writeStory(StoryRequest input, HttpServletRequest httpServletReq);
	boolean modifyStory(StoryRequest input, long storyno);
	StoryDetailResponse getStory(long storyno, HttpServletRequest httpServletReq);
	List<StoryResponse> getStories(User user);
	boolean deleteStory(long storyno);
	PhotoResponse uploadPhoto(MultipartFile file,String latitude, String longtitude, String date, HttpServletRequest httpServletReq);
	
}
