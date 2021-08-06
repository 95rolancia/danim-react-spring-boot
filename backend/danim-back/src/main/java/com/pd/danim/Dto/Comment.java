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
	private long commentNo;
		
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
	private User user;
	
	@Column(name = "comment_content")
	private String content;
	
	@Column(name = "comment_deleted")
	private boolean deleted;

	public long getCommentNo() {
		return commentNo;
	}

	public void setCommentNo(long commentNo) {
		this.commentNo = commentNo;
	}

	public Photo getPhoto() {
		return photo;
	}

	public void setPhoto(Photo photo) {
		this.photo = photo;
	}

	public Story getStory() {
		return story;
	}

	public void setStory(Story story) {
		this.story = story;
	}

	public SubStory getSubstory() {
		return substory;
	}

	public void setSubstory(SubStory substory) {
		this.substory = substory;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	
	
	
}
