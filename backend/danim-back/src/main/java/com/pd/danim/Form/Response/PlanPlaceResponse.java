package com.pd.danim.Form.Response;

public class PlanPlaceResponse implements Comparable<PlanPlaceResponse>{
	private long planPlaceNo;
	private String name;
	private String address;
	private String type;
	private String thumbnail;
	private int seqNo;
	public long getPlanPlaceNo() {
		return planPlaceNo;
	}
	public void setPlanPlaceNo(long planPlaceNo) {
		this.planPlaceNo = planPlaceNo;
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}
	
	
	
	public int getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}
	@Override
	public int compareTo(PlanPlaceResponse o) {
		
		return this.getSeqNo() - o.getSeqNo();
	}
	
	
	
	
}
