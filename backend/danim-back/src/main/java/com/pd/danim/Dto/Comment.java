package com.pd.danim.Dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Comment {
	@Id
	@Column(name = "comment_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long commentno;
		
	@ManyToOne
	@JoinColumn(name="photo_no")
	private Photo photo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="story_no")
	private Story story;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="substory_no")
	private SubStory substory;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_no")
	User user;
	
	@Column(name = "comment_content")
	private String content;
	
	@Column(name = "comment_deleted")
	private boolean deleted;
}
