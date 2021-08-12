package com.pd.danim.Service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Form.Response.StoryResponse;

public interface HomeService {
	
	List<List<StoryResponse>> getMyPopularStory(HttpServletRequest httpServletRequest);
	
	List<StoryResponse> getPopularStory();
}
