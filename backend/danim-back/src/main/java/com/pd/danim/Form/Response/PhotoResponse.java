package com.pd.danim.Form.Response;

import java.time.LocalDateTime;

import com.pd.danim.DTO.PhotoTag;

public class PhotoResponse implements Comparable<PhotoResponse> {
	private long photoNo;
	private String filename;
	private String latitude;
	private String longtitude;
	private String address;
	private String placeName;
	private LocalDateTime date;
	private PhotoTag tag;
	private String content;
			
	public long getPhotoNo() {
		return photoNo;
	}


	public void setPhotoNo(long photoNo) {
		this.photoNo = photoNo;
	}


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


	public LocalDateTime getDate() {
		return date;
	}


	public void setDate(LocalDateTime date) {
		this.date = date;
	}


	public PhotoTag getTag() {
		return tag;
	}


	public void setTag(PhotoTag tag) {
		this.tag = tag;
	}
	


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	@Override
	public int compareTo(PhotoResponse o) {
		return this.getDate().getNano() - o.getDate().getNano();
	}
	
	
	
	
}
