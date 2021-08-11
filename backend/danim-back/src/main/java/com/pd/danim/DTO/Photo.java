package com.pd.danim.DTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class Photo implements Comparable<Photo> {
	@Id
	@Column(name = "photo_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long photoNo;
		
	@ManyToOne
	@JoinColumn(name="substory_no")
	private SubStory substory;
	
	@ManyToOne
	@JoinColumn(name = "story_no")
	private Story story;
	
	@JoinColumn(name = "user_no")
	private long userNo;
	
	@Column(name = "latitude")
	private String latitude;
	
	@Column(name = "longtitude")
	private String longtitude ;
	
	@Column(name="photo_filename")
	private String filename;
	
	@Column(name="photo_content")
	private String content;
	
	@Column(name="photo_date")
	private LocalDateTime date;
	
	@Column(name="photo_deleted")
	private boolean deleted;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "tag")
	private PhotoTag tag;
	
	@Column(name ="address")
	private String address;
	
	@Column(name="space_name")
	private String spaceName;

	public long getPhotoNo() {
		return photoNo;
	}

	public void setPhotoNo(long photoNo) {
		this.photoNo = photoNo;
	}

	public SubStory getSubstory() {
		return substory;
	}

	public void setSubstory(SubStory substory) {
		this.substory = substory;
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

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongtitude() {
		return longtitude;
	}

	public void setLongtitude(String longtitude) {
		this.longtitude = longtitude;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public PhotoTag getTag() {
		return tag;
	}

	public void setTag(PhotoTag tag) {
		this.tag = tag;
	}


	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}	

	public String getSpaceName() {
		return spaceName;
	}

	public void setSpaceName(String spaceName) {
		this.spaceName = spaceName;
	}

	@Override
	public int compareTo(Photo o) {
		return this.getDate().getNano() - o.getDate().getNano();
	}

	
	
	
}
