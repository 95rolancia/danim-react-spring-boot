package com.pd.danim.Service;

import org.springframework.web.multipart.MultipartFile;

import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.PhotoUploadRequest;
import com.pd.danim.Form.Request.StoryRequest;
import com.pd.danim.Form.Response.PhotoResponse;

public interface StoryService {

	boolean writeStory(StoryRequest input);
	boolean modifyStory(StoryRequest input, long storyno, long userno);
	boolean getStory(long storyno);
	boolean getStories(User user);
	boolean deleteStory(long storyno);
	PhotoResponse uploadPhoto(PhotoUploadRequest photoReq, long userno);
	
}
