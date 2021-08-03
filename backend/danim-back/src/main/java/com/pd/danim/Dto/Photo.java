package com.pd.danim.Dto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Photo {
	@Id
	@Column(name = "photo_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	long photono;
	
	
	@ManyToOne
	@JoinColumn(name="substory_no")
	SubStory substory;
	
	
	@JoinColumn(name = "story_no")
	long storyno;
	
	@JoinColumn(name = "user_no")
	long userno;
	
	@Column(name = "latitude")
	double latitude;
	
	@Column(name = "latitue")
	double longitude ;
	
	@Column(name="photo_name")
	String name;
	
	@Column(name="photo_contnet")
	String content;
	
	@Column(name="photo_deleted")
	boolean deleted;
	
	@OneToMany(mappedBy = "photo")
	private List<Love> loves = new ArrayList();

	public long getPhotono() {
		return photono;
	}

	public void setPhotono(long photono) {
		this.photono = photono;
	}

	public SubStory getSubstory() {
		return substory;
	}

	public void setSubstory(SubStory substory) {
		this.substory = substory;
	}

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

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public List<Love> getLoves() {
		return loves;
	}

	public void setLoves(List<Love> loves) {
		this.loves = loves;
	}
	
	
}
