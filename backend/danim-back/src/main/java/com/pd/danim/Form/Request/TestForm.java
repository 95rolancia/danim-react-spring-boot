package com.pd.danim.Form.Request;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

public class TestForm {
	LocalDateTime date;
	MultipartFile file;
	
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
