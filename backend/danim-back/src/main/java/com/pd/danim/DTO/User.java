package com.pd.danim.DTO;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;



@Entity(name = "user")
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class User {
	
	@Id
	@Column(name = "user_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long userno;
	
	@Column(name = "nickname")
	@NotNull
	private String nickname;	
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "age")
	private int age;
	
	@Column(name ="introduce")
	private String introduce;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "role")
	private UserRole role;	
	
	@CreatedDate
	private LocalDateTime created_date;
	
	
	@Column(name ="profile")
	private String profile;
	

	@OneToMany(mappedBy = "user")
	private List<Interest> interests = new ArrayList();
	
	@OneToMany(mappedBy = "user")
	private List<Love> loves = new ArrayList();
	
	@OneToMany(mappedBy = "user")
	private List<Follow> follows = new ArrayList();

	public List<Follow> getFollows() {
		return follows;
	}

	public void setFollows(List<Follow> follows) {
		this.follows = follows;
	}

	public List<Love> getLoves() {
		return loves;
	}

	public void setLoves(List<Love> loves) {
		this.loves = loves;
	}

	public void setInterests(List<Interest> interests) {
		this.interests = interests;
	}

	public long getUserno() {
		return userno;
	}

	public void setUserno(long userno) {
		this.userno = userno;
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

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

	
	public LocalDateTime getCreated_date() {
		return created_date;
	}

	public void setCreated_date(LocalDateTime created_date) {
		this.created_date = created_date;
	}

	public String getIntroduce() {
		return introduce;
	}

	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public List<Interest> getInterests() {
		return interests;
	}

	public void setInterest(List<Interest> interests) {
		this.interests = interests;
	}

	
	
	
	
	
	
}
