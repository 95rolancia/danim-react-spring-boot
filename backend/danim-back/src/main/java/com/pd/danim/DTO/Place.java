package com.pd.danim.DTO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Place {
	@Id
	@Column(name="place_no")
	private long placeNo;
	
	@Column(name="place_type")
	private String type;
	@Column(name="place_name")
	private String name;
	@Column(name="place_address")
	private String address;
	@Column(name="place_latitude")
	private String latitude;
	@Column(name="place_longtitude")
	private String longtitude;
	@Column(name="place_photo")
	private String filename;
	public long getPlaceNo() {
		return placeNo;
	}
	public void setPlaceNo(long placeNo) {
		this.placeNo = placeNo;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
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
	
	
	
}
