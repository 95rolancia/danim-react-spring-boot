package com.pd.danim.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.Plan;
import com.pd.danim.DTO.SubPlan;

public interface SubPlanRepository extends CrudRepository<SubPlan, Long> {
	List<SubPlan> findAllByPlan(Plan plan);
	@Transactional
	boolean deleteAllByPlan(Plan plan);
}
