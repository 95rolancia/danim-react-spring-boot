package com.pd.danim.Dto;

import java.util.List;

public class MyPageForm {
	private String nickname;
	private int followingCnt;
	private int followerCnt;
	private List<UserSimpleForm> followingList;
	private List<UserSimpleForm> followerList;
	private List<Story> stories;
	
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
	public List<UserSimpleForm> getFollowingList() {
		return followingList;
	}
	public void setFollowingList(List<UserSimpleForm> followingList) {
		this.followingList = followingList;
		this.followingCnt = followingList.size();
	}
	public List<UserSimpleForm> getFollowerList() {
		return followerList;
	}
	public void setFollowerList(List<UserSimpleForm> followerList) {
		this.followerList = followerList;
		this.followerCnt = followerList.size();
	}
	public List<Story> getStories() {
		return stories;
	}
	public void setStories(List<Story> stories) {
		this.stories = stories;
	}
	
	
	
}
