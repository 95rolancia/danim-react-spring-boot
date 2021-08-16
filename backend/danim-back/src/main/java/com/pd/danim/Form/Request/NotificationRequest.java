package com.pd.danim.Form.Request;

public class NotificationRequest {
	
	
	private String toUserNickname;
	private String dataId;
	private Boolean  isRead;
	private String type;
	
	public String getToUserNickname() {
		return toUserNickname;
	}
	public void setToUserNickname(String toUserNo) {
		this.toUserNickname = toUserNo;
	}
	public String getDataId() {
		return dataId;
	}
	public void setDataId(String dataId) {
		this.dataId = dataId;
	}
	public Boolean  getIsRead() {
		return isRead;
	}
	public void setIsRead(Boolean  isRead) {
		this.isRead = isRead;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

}
