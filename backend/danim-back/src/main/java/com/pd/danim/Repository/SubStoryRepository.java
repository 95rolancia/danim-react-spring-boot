package com.pd.danim.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.Story;
import com.pd.danim.DTO.SubStory;

public interface SubStoryRepository extends CrudRepository<SubStory, Long> {
	List<SubStory> findAllByStory(Story story);
	@Transactional
	void deleteAllByStory(Story story);
}
