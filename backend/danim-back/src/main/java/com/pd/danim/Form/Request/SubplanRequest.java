package com.pd.danim.Form.Request;

import java.util.ArrayList;
import java.util.List;

public class SubplanRequest {
	private int seqNo; 
	private List<PlaceRequest> places = new ArrayList();
	
	public int getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}

	public List<PlaceRequest> getPlaces() {
		return places;
	}

	public void setPlaces(List<PlaceRequest> places) {
		this.places = places;
	}
	
	
	
}
