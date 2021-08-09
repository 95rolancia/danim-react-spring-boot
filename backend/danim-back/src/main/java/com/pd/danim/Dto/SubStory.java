package com.pd.danim.DTO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
@Table(name="substory")
public class SubStory {
	@Id
	@Column(name = "substory_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long substoryNo;
	
	
	@ManyToOne
	@JoinColumn(name="story_no")
	private Story story;
	
	@JoinColumn(name = "user_no")
	private long userNo;
	
	@Column(name ="seq_no")
	private int seqNo;
	
	
	@Column(name="substory_deleted")
	private boolean deleted;


	public long getSubstoryNo() {
		return substoryNo;
	}


	public void setSubstoryNo(long substoryNo) {
		this.substoryNo = substoryNo;
	}


	public Story getStory() {
		return story;
	}


	public void setStory(Story story) {
		this.story = story;
	}


	public long getUserNo() {
		return userNo;
	}


	public void setUserNo(long userNo) {
		this.userNo = userNo;
	}


	public int getSeqNo() {
		return seqNo;
	}


	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}


	public boolean isDeleted() {
		return deleted;
	}


	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}


	
}
