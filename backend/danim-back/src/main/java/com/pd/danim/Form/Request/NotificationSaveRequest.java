package com.pd.danim.Form.Request;

public class NotificationSaveRequest {
	
	private String from; 
    private String createdAt;
    private String dataId; 
    private Boolean isRead;
    private String type;
    private String commentId; 
    private String likeId; 
    private String followId; 
    private String userEmail;
    private String profile; 
    private String uuid;
    private long storyNo;
	
    public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	public String getDataId() {
		return dataId;
	}
	public void setDataId(String dataId) {
		this.dataId = dataId;
	}
	public Boolean getIsRead() {
		return isRead;
	}
	public void setIsRead(Boolean isRead) {
		this.isRead = isRead;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCommentId() {
		return commentId;
	}
	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}
	public String getLikeId() {
		return likeId;
	}
	public void setLikeId(String likeId) {
		this.likeId = likeId;
	}
	public String getFollowId() {
		return followId;
	}
	public void setFollowId(String followId) {
		this.followId = followId;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}

	public NotificationSaveRequest() {
		
	}
	
    public NotificationSaveRequest(String createdAt, String dataId, String fromUserNickname, Boolean isRead, String type){
        this.createdAt = createdAt;
        this.dataId = dataId;
        this.from = fromUserNickname;
        this.isRead = isRead;
        this.type = type;
    }
	public long getStoryNo() {
		return storyNo;
	}
	public void setStoryNo(long storyNo) {
		this.storyNo = storyNo;
	}
	
	
	
	
	
	
	
	

}
