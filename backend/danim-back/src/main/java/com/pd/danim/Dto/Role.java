package com.pd.danim.Dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "role")
public class Role {

	@Id
	@Column(name = "id")
	private int id;
	
	@Column(name = "name")
	private String name;
}


