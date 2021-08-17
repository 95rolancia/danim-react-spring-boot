package com.pd.danim.Service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Form.Response.MyPopularPhotoResponse;
import com.pd.danim.Form.Response.MyPopularResponse;
import com.pd.danim.Form.Response.StoryResponse;

public interface HomeService {
	
	List<MyPopularResponse> getMyPopularStory(HttpServletRequest httpServletRequest);
	
	List<StoryResponse> getPopularStory();
	
	List<MyPopularPhotoResponse> getMyPopularPhoto(HttpServletRequest httpServletRequest);
}
