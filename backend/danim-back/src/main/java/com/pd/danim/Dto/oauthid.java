package com.pd.danim.Dto;

import javax.persistence.*;

@Entity(name = "user")
public class oauthid {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@OneToOne
	@JoinColumn(name = "user_no")
	private User user;
	
	@Column(name = "type")
	private String type;
}
