package com.pd.danim.Form.Response;

import java.util.List;

import com.pd.danim.DTO.Story;

public class UserPageResponse {
	private String nickname;
	private String profile;
	private int followingCnt;
	private int followerCnt;
	private List<UserSimpleResponse> followingList;
	private List<UserSimpleResponse> followerList;
	private List<Story> stories;
	private boolean isFollow;
	
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public int getFollowingCnt() {
		return followingCnt;
	}
	public void setFollowingCnt(int followingCnt) {
		this.followingCnt = followingCnt;
	}
	public int getFollowerCnt() {
		return followerCnt;
	}
	public void setFollowerCnt(int followerCnt) {
		this.followerCnt = followerCnt;
	}
	public List<UserSimpleResponse> getFollowingList() {
		return followingList;
	}
	public void setFollowingList(List<UserSimpleResponse> followingList) {
		this.followingList = followingList;
		this.followingCnt = followingList.size();
	}
	public List<UserSimpleResponse> getFollowerList() {
		return followerList;
	}
	public void setFollowerList(List<UserSimpleResponse> followerList) {
		this.followerList = followerList;
		this.followerCnt = followerList.size();
	}
	public List<Story> getStories() {
		return stories;
	}
	public void setStories(List<Story> stories) {
		this.stories = stories;
	}
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}
	public boolean isFollow() {
		return isFollow;
	}
	public void setFollow(boolean isFollow) {
		this.isFollow = isFollow;
	}
	
	
	
	
	
}
