package com.pd.danim.Form.Response;

public class PlanPlaceResponse implements Comparable<PlanPlaceResponse>{
	
	private String name;
	private String address;
	private String latitude;
	private String longtitude;
	private long placeNo;
	private int seqNo;

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
	public int getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}
	
	
	public long getPlaceNo() {
		return placeNo;
	}
	public void setPlaceNo(long placeNo) {
		this.placeNo = placeNo;
	}
	@Override
	public int compareTo(PlanPlaceResponse o) {
		
		return this.getSeqNo() - o.getSeqNo();
	}
	
	
	
	
}
