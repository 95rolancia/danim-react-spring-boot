package com.pd.danim.Dto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Data;

@Data
public class SignUpForm {
	
	@ApiModelProperty(value = "사용자 아이디(이메일)", required=true, example="test@test.com")
	private String userId;
	@ApiModelProperty(value = "사용자 비밀번호", example="1q2w3e4r")
	private String password;
	@ApiModelProperty(value = "닉네임", example="김실험")
	private String nickname;
	@ApiModelProperty(value = "나이", example="20")
	private int age;
	@ApiModelProperty(value = "성별", example="M")
	private String gender;
	@ApiModelProperty(value = "키", example="55064", notes="이메일 인증 키 값")
	private String key;
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	
	
	
}
