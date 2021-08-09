package com.pd.danim.DTO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Love {
	
	@Id
	@Column(name = "love_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long loveNo;
	
	@ManyToOne
	@JoinColumn(name="user_no")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="photo_no")
	private Photo photo;
	
	@ManyToOne
	@JoinColumn(name="story_no")
	private Story story;
	
	@ManyToOne
	@JoinColumn(name="substory_no")
	private SubStory substory;

	public long getLoveNo() {
		return loveNo;
	}

	public void setLoveNo(long loveNo) {
		this.loveNo = loveNo;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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
	
	
	
	
	
}
