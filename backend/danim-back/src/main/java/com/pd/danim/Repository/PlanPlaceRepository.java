package com.pd.danim.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.PlanPlace;
import com.pd.danim.DTO.SubPlan;

public interface PlanPlaceRepository extends CrudRepository<PlanPlace, Long> {
	List<PlanPlace> findAllBySubPlan(SubPlan subplan);
}
