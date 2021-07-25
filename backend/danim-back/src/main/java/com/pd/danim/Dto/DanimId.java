package com.pd.danim.Dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.Email;

@Entity(name = "danimid")
public class DanimId {
	
	@Id
	@Column(name = "id")
	@Email
	private String id;
	
	@OneToOne
	@JoinColumn(name = "user_no")
	private User user;
	
	@Column(name = "password")
	private String password;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public long getUserno() {
		return user.getUserno();
	}
	
	
	
}
