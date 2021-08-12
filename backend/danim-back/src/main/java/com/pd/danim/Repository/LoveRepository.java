package com.pd.danim.Repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.Love;
import com.pd.danim.DTO.Story;
import com.pd.danim.DTO.User;

public interface LoveRepository extends CrudRepository<Love, Long> {
	
	boolean existsByUserAndStory(User user, Story story);
	
	@Transactional
	int deleteByUserAndStory(User user,Story story);

}
