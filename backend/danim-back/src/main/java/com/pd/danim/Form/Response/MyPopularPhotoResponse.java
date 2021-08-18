package com.pd.danim.Form.Response;

import com.pd.danim.DTO.PhotoTag;

public class MyPopularPhotoResponse {
	
	private Long storyNo;
	private Long photoNo;
	private	String userNickname;
	private String filePath;
	private PhotoTag tag;
	
	public Long getStoryNo() {
		return storyNo;
	}
	public void setStoryNo(Long storyNo) {
		this.storyNo = storyNo;
	}
	public String getUserNickname() {
		return userNickname;
	}
	public void setUserNickname(String userNickname) {
		this.userNickname = userNickname;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public Long getPhotoNo() {
		return photoNo;
	}
	public void setPhotoNo(Long photoNo) {
		this.photoNo = photoNo;
	}
	public PhotoTag getTag() {
		return tag;
	}
	public void setTag(PhotoTag tag) {
		this.tag = tag;
	}

	

}
