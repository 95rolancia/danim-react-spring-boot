package com.pd.danim.Dto;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="사진 폼", description="위도,경도,내용, 사진 날짜, 사진 태그, 사진 파일")
public class PhotoForm {
	
	@ApiModelProperty(value = "위도", example="12.5456688")
	private String latitude; //위도
	@ApiModelProperty(value = "경도", example="32.4520235")
	private String longtitude; //경도
	@ApiModelProperty(value = "내용", example="나는 ㄱr끔... 여행을 떠난다...")
	private String content; //내용
	@ApiModelProperty(value = "사진 날짜", example="2021-08-21 12:42:33")
	private LocalDateTime date; //사진 날짜
	@ApiModelProperty(value = "사진 태그", example="FOOD")
	private PhotoTag tag;
	@ApiModelProperty(value = "사진 파일", example="jpg, png")
	private MultipartFile file; //사진 파일
	


	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongtitude() {
		return longtitude;
	}

	public void setLongtitude(String longtitude) {
		this.longtitude = longtitude;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public MultipartFile getFile() {
		return file;
	}

	public void setFiles(MultipartFile file) {
		this.file = file;
	}

	public PhotoTag getTag() {
		return tag;
	}

	public void setTag(PhotoTag tag) {
		this.tag = tag;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}
	

	
	
	
}
