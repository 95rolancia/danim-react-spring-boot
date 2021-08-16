package com.pd.danim.Form.Request;

import com.pd.danim.DTO.PlanPlace;

public class PlanRequest {
	private String title;
	private String startDate;
	private String endDate;
	private PlaceRequest[][] places;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public PlaceRequest[][] getPlaces() {
		return places;
	}
	public void setPlaces(PlaceRequest[][] places) {
		this.places = places;
	}
	
	
	
}
