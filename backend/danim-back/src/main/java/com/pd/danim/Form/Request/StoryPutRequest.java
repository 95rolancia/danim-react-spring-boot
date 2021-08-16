package com.pd.danim.Form.Request;

import com.pd.danim.DTO.StoryStatus;

public class StoryPutRequest {
	private String title;
	private String thumbnail;
	private StoryStatus status;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}
	public StoryStatus getStatus() {
		return status;
	}
	public void setStatus(StoryStatus status) {
		this.status = status;
	}
	
	
}
