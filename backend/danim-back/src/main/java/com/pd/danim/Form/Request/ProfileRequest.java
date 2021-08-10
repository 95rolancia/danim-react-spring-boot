package com.pd.danim.Form.Request;

import org.springframework.web.multipart.MultipartFile;

public class ProfileRequest {
	
	private MultipartFile file;
	private String nickname;
	public MultipartFile getFile() {
		return file;
	}
	public void setFile(MultipartFile file) {
		this.file = file;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	
	
}
