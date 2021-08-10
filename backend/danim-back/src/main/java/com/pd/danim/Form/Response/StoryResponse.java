package com.pd.danim.Form.Response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class StoryResponse {
	private long storyNo;
	private String title;
	private String thumbnail;
	private LocalDateTime createdDate;
	private LocalDateTime startDate;
	private int duration;
	private List<LoveResponse> loves = new ArrayList();
	
	
	public long getStoryNo() {
		return storyNo;
	}
	public void setStoryNo(long storyNo) {
		this.storyNo = storyNo;
	}
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
	public LocalDateTime getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}
	public LocalDateTime getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public List<LoveResponse> getLoves() {
		return loves;
	}
	public void setLoves(List<LoveResponse> loves) {
		this.loves = loves;
	}
	
			
	
	
	
}
