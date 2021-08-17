package com.pd.danim.Form.Response;

import java.util.ArrayList;
import java.util.List;

public class MyPopularResponse {
	
	private String area;
	private List<StoryResponse> stories = new ArrayList<StoryResponse>();
	
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public List<StoryResponse> getStories() {
		return stories;
	}
	public void setStories(List<StoryResponse> stories) {
		this.stories = stories;
	}
	

}
