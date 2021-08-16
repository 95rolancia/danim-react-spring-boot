package com.pd.danim.Form.Request;

import com.pd.danim.DTO.PhotoTag;

public class PhotoPutRequest {
	private long photoNo;
	private String content;
	private PhotoTag tag;
	public long getPhotoNo() {
		return photoNo;
	}
	public void setPhotoNo(long photoNo) {
		this.photoNo = photoNo;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public PhotoTag getTag() {
		return tag;
	}
	public void setTag(PhotoTag tag) {
		this.tag = tag;
	}
	
	
}
