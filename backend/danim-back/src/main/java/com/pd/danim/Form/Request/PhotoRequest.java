package com.pd.danim.Form.Request;

import java.time.LocalDateTime;

import com.pd.danim.DTO.PhotoTag;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="사진 폼", description="사진 파일명, 사진 날짜, 사진 태그, 사진 파일, 요청자 아이디")
public class PhotoRequest implements Comparable<PhotoRequest> {
	
	@ApiModelProperty(value="사진 파일명", example ="3142-1232-234.png")
	private String filename;
	
	@ApiModelProperty(value = "위도", example="12.5456688")
	private String latitude; 
	
	@ApiModelProperty(value = "경도", example="32.4520235")
	private String longtitude; 
	
	@ApiModelProperty(value = "내용", example="나는 ㄱr끔... 여행을 떠난다...")
	private String content; 
	
	@ApiModelProperty(value = "사진 날짜", example="2021-08-21 12:42:33")
	private String date;
	
	@ApiModelProperty(value = "사진 태그", example="FOOD")
	private PhotoTag tag;
	
	@ApiModelProperty(value = "주소명", example="대전광역시 유성구 상대로 12")
	private String address;
	
	@ApiModelProperty(value = "장소 이름", example="유성온천역")
	private String placeName;

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
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

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public PhotoTag getTag() {
		return tag;
	}

	public void setTag(PhotoTag tag) {
		this.tag = tag;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPlaceName() {
		return placeName;
	}

	public void setPlaceName(String placeName) {
		this.placeName = placeName;
	}

	@Override
	public int compareTo(PhotoRequest o) {
		
		return LocalDateTime.parse(this.getDate()).getNano() - LocalDateTime.parse(o.getDate()).getNano();
	}
		
	
	
	
	
}
