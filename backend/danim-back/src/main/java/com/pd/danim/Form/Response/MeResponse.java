package com.pd.danim.Form.Response;

import java.util.ArrayList;
import java.util.List;

import com.pd.danim.DTO.UserRole;

public class MeResponse {
	private String userId;
	private String nickname;
	private String gender;
	private int age;
	private String introduce;
	private UserRole role;
	private String areas[];
	private String profile;
	private List<StoryResponse> stories = new ArrayList();
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getIntroduce() {
		return introduce;
	}
	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}
	public UserRole getRole() {
		return role;
	}
	public void setRole(UserRole role) {
		this.role = role;
	}
	public String[] getAreas() {
		return areas;
	}
	public void setAreas(String[] areas) {
		this.areas = areas;
	}
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}
	public List<StoryResponse> getStories() {
		return stories;
	}
	public void setStories(List<StoryResponse> stories) {
		this.stories = stories;
	}
	
	
	
	
}
