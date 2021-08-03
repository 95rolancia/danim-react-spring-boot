package com.pd.danim.Dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class Story {
	
	@Id
	@Column(name = "story_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	long storyno;
	
	
	@JoinColumn(name="user_no")
	long userno;
	
	@Column(name="title")
	String title;
	
	@Column(name="start_date")
	private Date start_date;
	
	@Column(name="duration")
	private int duration;
	
	@Column(name="story_deleted")
	private boolean storydeleted;
	
	@Column(name="thumbnail")
	private String thumbnail;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "role")
	private StoryStatus status;

	public long getStoryno() {
		return storyno;
	}

	public void setStoryno(long storyno) {
		this.storyno = storyno;
	}

	public long getUserno() {
		return userno;
	}

	public void setUserno(long userno) {
		this.userno = userno;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getStart_date() {
		return start_date;
	}

	public void setStart_date(Date start_date) {
		this.start_date = start_date;
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

	public String getTitlephoto() {
		return titlephoto;
	}

	public void setTitlephoto(String titlephoto) {
		this.titlephoto = titlephoto;
	}

	public StoryStatus getStatus() {
		return status;
	}

	public void setStatus(StoryStatus status) {
		this.status = status;
	}

	
	
	
	
	
}
