package com.pd.danim.Service;

import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.StoryRequest;

public interface StoryService {

	boolean writeStory(StoryRequest input);
	boolean modifyStory(StoryRequest input, long storyno, long userno);
	boolean getStory(long storyno);
	boolean getStories(User user);
	boolean deleteStory(long storyno);
	
}
