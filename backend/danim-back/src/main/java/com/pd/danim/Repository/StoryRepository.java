package com.pd.danim.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.Dto.Story;
import com.pd.danim.Dto.StoryStatus;

public interface StoryRepository extends CrudRepository<Story, Long> {
	List<Story> findAllByUserNo(long userno);
	List<Story> findAllByUserNoAndStatus(long userno, StoryStatus status);
}
