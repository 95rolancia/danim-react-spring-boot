package com.pd.danim.Form.Response;

import java.util.ArrayList;
import java.util.List;

public class SubPlanResponse implements Comparable<SubPlanResponse>{
	private long subplanNo;
	private int seqNo;
	private List<PlanPlaceResponse> places = new ArrayList();
	
	
	public long getSubplanNo() {
		return subplanNo;
	}


	public void setSubplanNo(long subplanNo) {
		this.subplanNo = subplanNo;
	}


	public int getSeqNo() {
		return seqNo;
	}


	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}


	public List<PlanPlaceResponse> getPlaces() {
		return places;
	}


	public void setPlaces(List<PlanPlaceResponse> places) {
		this.places = places;
	}


	@Override
	public int compareTo(SubPlanResponse o) {
		return this.getSeqNo() - o.getSeqNo();
	}
	
	

}
