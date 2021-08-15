package com.pd.danim.Service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Form.Response.StoryResponse;

public interface HomeService {
	
	Map<String,List<StoryResponse>> getMyPopularStory(HttpServletRequest httpServletRequest);
	
	List<StoryResponse> getPopularStory();
}
