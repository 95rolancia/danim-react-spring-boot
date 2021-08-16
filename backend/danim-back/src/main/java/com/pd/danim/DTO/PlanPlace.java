package com.pd.danim.DTO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity(name="planplace")
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class PlanPlace {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long planplace_no;
	
	@ManyToOne
	@JoinColumn(name="subplan_no")
	private SubPlan subplan;
	
	@Column(name="latitude")
	private String latitude;
	
	@Column(name="longtitude")
	private String longtitude;
	
	@Column(name="place_name")
	private String placeName;
	
	@Column(name="seq_no")
	private int seqNo;

	public long getPlanplace_no() {
		return planplace_no;
	}

	public void setPlanplace_no(long planplace_no) {
		this.planplace_no = planplace_no;
	}

	public SubPlan getSubplan() {
		return subplan;
	}

	public void setSubplan(SubPlan subplan) {
		this.subplan = subplan;
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

	public String getPlaceName() {
		return placeName;
	}

	public void setPlaceName(String placeName) {
		this.placeName = placeName;
	}

	public int getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}
	
	
	
	
	
}
