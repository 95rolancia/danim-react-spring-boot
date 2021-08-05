package com.pd.danim.Dto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;


@ApiModel(value="스토리 폼", description="회원 번호, 스토리 제목, 여행 시작 날짜, 여행 기간, 게시글 상태, 사진들")
public class StoryForm {
	
	@ApiModelProperty(value = "회원 번호", example="486")
	private long userno; //회원번호
	@ApiModelProperty(value = "스토리 제목", required=true, example="바람이 불어오는 나의 제주도 여행기")
	private String title; //스토리 제목
	@ApiModelProperty(value = "여행 시작 날짜", required=true, example="2021-05-30")
	private LocalDateTime startDate; //여행 시작 날짜 
	@ApiModelProperty(value = "여행 기간", required=true, example="4")
	private int duration; //여행 기간
	@ApiModelProperty(value = "게시글 상태", example="PUBLISHED")
	private StoryStatus status; //게시글 상태
	@ApiModelProperty(value="썸네일 이미지 번호", example="3")
	private int thumbnailNo;
	
	@ApiModelProperty(value = "사진들")
	private List<PhotoForm> photos; //사진들
	public long getUserno() {
		return userno;
	}
	public void setUserno(long userno) {
		this.userno = userno;
	}
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
	public List<PhotoForm> getPhotos() {
		return photos;
	}
	public void setPhotos(List<PhotoForm> photos) {
		this.photos = photos;
	}
	public int getThumbnailNo() {
		return thumbnailNo;
	}
	public void setThumbnailNo(int thumbnailNo) {
		this.thumbnailNo = thumbnailNo;
	}

	
		
	
	
}
