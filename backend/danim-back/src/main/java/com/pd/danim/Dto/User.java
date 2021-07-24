package com.pd.danim.Dto;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;



@Entity(name = "user")
public class User {
	
	@Id
	@Column(name = "user_no")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long user_no;
	
	@Column(name = "nickname")
	@NotNull
	private String nickname;	
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "age")
	private int age;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "role")
	@NotNull
	private UserRole role;
	
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull	
	private Date create_date;

	
}
