package com.pd.danim.DTO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name="interest")
public class Interest {
	
	@Id
	@Column(name="id")
	@JsonIgnore
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name="area")
	private String area;
	
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

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}




	
	
	
	
}
