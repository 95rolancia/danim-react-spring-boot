package com.pd.danim.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.PlanPlace;
import com.pd.danim.DTO.SubPlan;

public interface PlanPlaceRepository extends CrudRepository<PlanPlace, Long> {
	List<PlanPlace> findAllBySubplan(SubPlan subplan);
	@Transactional
	void deleteAllBySubplan(SubPlan subplan);
}
