package com.pd.danim.Form.Request;

import java.time.LocalDateTime;
import java.util.List;

import com.pd.danim.DTO.StoryStatus;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;


@ApiModel(value="스토리 폼", description="회원 번호, 스토리 제목, 여행 시작 날짜, 여행 기간, 게시글 상태, 사진들")
public class StoryRequest {
	
	@ApiModelProperty(value = "스토리 제목", required=true, example="바람이 불어오는 나의 제주도 여행기")
	private String title; 
	@ApiModelProperty(value = "여행 시작 날짜", required=true, example="2021-05-30")
	private LocalDateTime startDate; 
	@ApiModelProperty(value = "여행 기간", required=true, example="4")
	private int duration; 
	@ApiModelProperty(value = "게시글 상태", example="PUBLISHED")
	private StoryStatus status; 
	@ApiModelProperty(value="썸네일 이미지명", example="23-123421-asdf42.png")
	private String thumbnail;
	
	@ApiModelProperty(value = "사진들 상세 정보")
	private List<PhotoRequest> photos;

	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
	public StoryStatus getStatus() {
		return status;
	}
	public void setStatus(StoryStatus status) {
		this.status = status;
	}
	public List<PhotoRequest> getPhotos() {
		return photos;
	}
	public void setPhotos(List<PhotoRequest> photos) {
		this.photos = photos;
	}
	public String getThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}		
	
	
}
