package com.pd.danim.Form.Request;

import java.util.List;

import com.pd.danim.DTO.StoryStatus;

public class StoryPutRequest {
	private String title;
	private String thumbnail;
	private StoryStatus status;
	private String startDate;
	private int duration;
	private List<PhotoRequest> photos;
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
	public int getDuration() {
		return duration;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public List<PhotoRequest> getPhotos() {
		return photos;
	}
	public void setPhotos(List<PhotoRequest> photos) {
		this.photos = photos;
	}
	
	
}
