package com.pd.danim.Form.Request;

import java.util.List;

public class NotificationReadRequest {
	
	private List<NotificationSaveRequest> notis;
	private String nickname;

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public List<NotificationSaveRequest> getNotis() {
		return notis;
	}

	public void setNotis(List<NotificationSaveRequest> notis) {
		this.notis = notis;
	}

}
