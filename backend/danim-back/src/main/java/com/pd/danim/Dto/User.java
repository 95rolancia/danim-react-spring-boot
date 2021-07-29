package com.pd.danim.Dto;


import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity(name = "User")
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
	
	@Enumerated(EnumType.STRING)
	@Column(name = "role")
	private UserRole role;
	
	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
	private DanimId danim;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date created_date;
	
	
	@Column(name ="profile")
	private String profile;
	

	@OneToMany(mappedBy = "user")
	private List<Interest> interests;
	

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

	public Date getCreated_date() {
		return created_date;
	}

	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}

//	public DanimId getDanim() {
//		return danim;
//	}
//
//	public void setDanim(DanimId danim) {
//		this.danim = danim;
//	}

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
