package com.pd.danim.Form.Response;

import java.time.LocalDateTime;
import java.util.List;

import com.pd.danim.DTO.StoryStatus;

import io.swagger.annotations.ApiModel;

@ApiModel(value="스토리 상세보기", description="스토리 제목, 여행 시작 날짜, 여행 기간, 게시글 상태, 사진들")
public class StoryDetailResponse {
	private String nickname;
	private String title;
	private String thumbnail;	
	private LocalDateTime startDate;
	private int duration;
	private long loveCount;
	private boolean isLove;
	private StoryStatus status;
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
	public long getLoveCount() {
		return loveCount;
	}
	public void setLoveCount(long loveCount) {
		this.loveCount = loveCount;
	}
	public StoryStatus getStatus() {
		return status;
	}
	public void setStatus(StoryStatus status) {
		this.status = status;
	}
	

	
	
}
