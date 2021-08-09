package com.pd.danim.DTO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "follow")
public class Follow {
	
	@Id
	@Column(name="follow_no")
	@JsonIgnore
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "follow_user_no")
	private long followUserNo;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="user_no")
	private User user;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getFollowUserNo() {
		return followUserNo;
	}

	public void setFollowUserNo(long followUserNo) {
		this.followUserNo = followUserNo;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	

}
