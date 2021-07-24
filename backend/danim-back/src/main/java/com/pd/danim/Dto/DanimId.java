package com.pd.danim.Dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity(name = "danimid")
public class DanimId {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@OneToOne
	@JoinColumn(name = "user_no")
	private User user;
	
	@Column(name = "password")
	private String password;

}
