package com.pd.danim.Dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="substory")
public class SubStory {
	@Id
	@Column(name = "substory_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	long substoryno;
	
	
	@ManyToOne
	@JoinColumn(name="story_no")
	Story story;
	
	@JoinColumn(name = "user_no")
	long userno;
	
	@Column(name ="seq_no")
	int seqno;
	
	
	@Column(name="substory_deleted")
	private boolean deleted;


	public long getSubstoryno() {
		return substoryno;
	}


	public void setSubstoryno(long substoryno) {
		this.substoryno = substoryno;
	}


	public Story getStory() {
		return story;
	}


	public void setStory(Story story) {
		this.story = story;
	}


	public long getUserno() {
		return userno;
	}


	public void setUserno(long userno) {
		this.userno = userno;
	}


	public int getSeqno() {
		return seqno;
	}


	public void setSeqno(int seqno) {
		this.seqno = seqno;
	}


	public boolean isDeleted() {
		return deleted;
	}


	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	
	
	
	
}
