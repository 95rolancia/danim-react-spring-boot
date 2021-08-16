package com.pd.danim.Form.Response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PlanResponse {
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	private String title;	
	private List<SubPlanResponse> subplans = new ArrayList();
	
	public LocalDateTime getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}
	public LocalDateTime getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<SubPlanResponse> getSubplans() {
		return subplans;
	}
	public void setSubplans(List<SubPlanResponse> subplans) {
		this.subplans = subplans;
	}
	
	
	

}
