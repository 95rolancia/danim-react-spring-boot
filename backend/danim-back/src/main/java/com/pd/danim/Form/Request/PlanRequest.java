package com.pd.danim.Form.Request;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PlanRequest {
	private String title;
	private String startDate;
	private String endDate;
	private List<SubplanRequest> subplans = new ArrayList();		
	
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
	public List<SubplanRequest> getSubplans() {
		return subplans;
	}
	public void setSubplans(List<SubplanRequest> subplans) {
		this.subplans = subplans;
	}
	
	
	
}
