package com.pd.danim.Form.Response;

import java.time.LocalDateTime;
import java.util.List;

public class StoryDetailResponse {
	private String nickname;
	private String title;
	private String thumbnail;	
	private LocalDateTime startDate;
	private int duration;
	private boolean isLove;
	List<SubStoryResponse> substories;
	
	
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
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
	public List<SubStoryResponse> getSubstories() {
		return substories;
	}
	public void setSubstories(List<SubStoryResponse> substories) {
		this.substories = substories;
	}
	public boolean getIsLove() {
		return isLove;
	}
	public void setIsLove(boolean isLove) {
		this.isLove = isLove;
	}
	
	
	
}
