package com.pd.danim.Service;

import com.pd.danim.Dto.StoryForm;
import com.pd.danim.Dto.User;

public interface StoryService {

	boolean writeStory(StoryForm input);
	boolean modifyStory(StoryForm input, long storyno, long userno);
	boolean getStory(long storyno);
	boolean getStories(User user);
	boolean deleteStory(long storyno);
	
}
