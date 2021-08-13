package com.pd.danim.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.Plan;
import com.pd.danim.DTO.User;

public interface PlanRepository extends CrudRepository<Plan, Long> {
	List<Plan> findAllByUser(User user);
}
