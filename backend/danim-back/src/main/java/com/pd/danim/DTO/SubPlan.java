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

@Entity
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class SubPlan {
	@Id
	@Column(name="subplan_no")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long subplanNo;
	
	@ManyToOne
	@JoinColumn(name="plan_no")
	private Plan plan;
	
	@Column(name="seq_no")
	private int seqNo;

	public long getSubplanNo() {
		return subplanNo;
	}

	public void setSubplanNo(long subplanNo) {
		this.subplanNo = subplanNo;
	}

	public Plan getPlan() {
		return plan;
	}

	public void setPlan(Plan plan) {
		this.plan = plan;
	}

	public int getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}
	
	
	
	
	
}
