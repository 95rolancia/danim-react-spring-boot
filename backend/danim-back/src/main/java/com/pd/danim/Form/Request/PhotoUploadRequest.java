package com.pd.danim.Form.Request;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="업로드(사진) 폼", description="위도,경도,내용, 사진 날짜, 사진 태그, 사진 파일, 요청자 아이디")
public class PhotoUploadRequest {
	
	
	@ApiModelProperty(value= "요청한 아이디", example="example@danim.com")
	private String userId;	
	
	@ApiModelProperty(value = "위도", example="12.5456688")
	private String latitude;
	
	@ApiModelProperty(value = "경도", example="32.4520235")
	private String longtitude;
	
	@ApiModelProperty(value = "사진 날짜", example="2021-08-21 12:42:33")
	private LocalDateTime date;
	
	@ApiModelProperty(value = "사진 파일", example="jpg, png")
	private MultipartFile file;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

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

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}
	

	
	
	
}
