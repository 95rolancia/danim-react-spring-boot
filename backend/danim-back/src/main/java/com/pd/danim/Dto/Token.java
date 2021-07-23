package com.pd.danim.Dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity(name = "token")
public class Token {
	
	@Id
	@Column(name = "token_no")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long token_no;
	

	@Column(name = "refresh_token")
	private String refresh_toekn;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date create_date;
}
