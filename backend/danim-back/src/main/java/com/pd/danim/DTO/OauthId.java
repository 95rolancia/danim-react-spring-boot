package com.pd.danim.DTO;

import javax.persistence.*;

@Entity(name = "oauthid")
public class OauthId {

	@Id
	@Column(name = "id")
	private String id;
	
	@OneToOne
	@JoinColumn(name = "user_no")
	private User user;

}
