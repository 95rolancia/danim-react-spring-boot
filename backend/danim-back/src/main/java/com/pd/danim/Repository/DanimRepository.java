package com.pd.danim.Repository;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.User;

public interface DanimRepository extends CrudRepository<DanimId, Long>{
	DanimId findById(String id);
	boolean existsById(String id);
	DanimId findByUser(User user);

}
