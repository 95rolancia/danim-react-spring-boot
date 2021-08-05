package com.pd.danim.Dto;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class Story {
	
	@Id
	@Column(name = "story_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	long storyNo;
	
	
	@JoinColumn(name="user_no")
	long userNo;
	
	@Column(name="title")
	String title;
	
	@CreationTimestamp
	@Column(name="created_date")
	private LocalDateTime createdDate;
	
	@Column(name="start_date")
	private LocalDateTime startDate;
	
	@Column(name="duration")
	private int duration;
	
	@Column(name="story_deleted")
	private boolean storydeleted;
	
	@Column(name="thumbnail")
	private String thumbnail;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "role")
	private StoryStatus status;

	public long getStoryNo() {
		return storyNo;
	}

	public void setStoryNo(long storyNo) {
		this.storyNo = storyNo;
	}

	public long getUserNo() {
		return userNo;
	}

	public void setUserNo(long userNo) {
		this.userNo = userNo;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	public LocalDateTime getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public boolean isStorydeleted() {
		return storydeleted;
	}

	public void setStorydeleted(boolean storydeleted) {
		this.storydeleted = storydeleted;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public StoryStatus getStatus() {
		return status;
	}

	public void setStatus(StoryStatus status) {
		this.status = status;
	}





	
	
	
	
	
}
