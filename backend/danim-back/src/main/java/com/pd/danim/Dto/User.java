package com.pd.danim.Dto;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Fetch;

@Entity(name = "user")
public class User {
	
	@Id
	@Column(name = "user_no")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long user_no;
	
	@Column(name = "nickname")
	private String nickname;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="rold_id")
	private Role role;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "age")
	private int age;
	
	
	
}
