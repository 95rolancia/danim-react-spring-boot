package com.pd.danim.Form.Request;

public class NotificationSaveRequest {
	
	private String from; // follow: 팔로우 누른 사람의 닉네임
    private String createdAt;
    private String dataId; // follow: 팔로우 받은 사람의 닉네임, like: 좋아요 받은 sns_id, comment: 댓글 받은 sns_id, commit: 주소
    private Boolean isRead;
    private String type;
    private String commentId; // comment: 방금 단 댓글의 id (알림 삭제 위함)
    private String likeId; // like: 방금 한 좋아요 id
    private String followId; // follow: 방금 신청한 follow id
    private String userEmail;
    private String profile; // 알림을 보낸 사람의 프로필 사진
    private String uuid;
	
	
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
	
	
	
	
	
	
	
	

}
