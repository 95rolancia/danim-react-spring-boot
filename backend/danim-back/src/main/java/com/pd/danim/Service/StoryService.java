package com.pd.danim.Service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.PhotoPutRequest;
import com.pd.danim.Form.Request.StoryPutRequest;
import com.pd.danim.Form.Request.StoryRequest;
import com.pd.danim.Form.Response.PhotoResponse;
import com.pd.danim.Form.Response.StoryDetailResponse;
import com.pd.danim.Form.Response.StoryResponse;

public interface StoryService {

	boolean writeStory(StoryRequest input, HttpServletRequest httpServletReq);
	int modifyStory(long storyNo, StoryRequest req, HttpServletRequest httpServletReq);
	int modifyPhoto(PhotoPutRequest req, HttpServletRequest httpServletReq);
	StoryDetailResponse getStory(long storyNo, HttpServletRequest httpServletReq);
	List<StoryResponse> getStories(User user);
	int deleteStory(long storyNo, HttpServletRequest httpServletReq);
	PhotoResponse uploadPhoto(MultipartFile file,String latitude, String longtitude, String date, HttpServletRequest httpServletReq);
	
}
