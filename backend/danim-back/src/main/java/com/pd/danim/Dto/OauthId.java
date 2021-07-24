package com.pd.danim.Dto;

import javax.persistence.*;

@Entity(name = "oauthid")
public class OauthId {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@OneToOne
	@JoinColumn(name = "user_no")
	private User user;

}
