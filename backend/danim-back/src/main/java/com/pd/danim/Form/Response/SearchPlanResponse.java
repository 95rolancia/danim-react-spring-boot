package com.pd.danim.Form.Response;

import java.time.LocalDateTime;

public class SearchPlanResponse {
	private String title;
	private long planNo;
	private LocalDateTime startDate;
	private LocalDateTime endDate;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public long getPlanNo() {
		return planNo;
	}
	public void setPlanNo(long planNo) {
		this.planNo = planNo;
	}
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
	
	
}
