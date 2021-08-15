package com.pd.danim.Form.Response;

public class SearchByAreaResponse {

	private long storyNo;
	private String photoFileName;
	private String title;
	
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public long getStoryNo() {
		return storyNo;
	}
	public void setStoryNo(long storyNo) {
		this.storyNo = storyNo;
	}
	public String getPhotoFileName() {
		return photoFileName;
	}
	public void setPhotoFileName(String photoFileName) {
		this.photoFileName = photoFileName;
	}

}
