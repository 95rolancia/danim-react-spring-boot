package com.pd.danim.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.Comment;
import com.pd.danim.DTO.Story;

public interface CommentRepository extends CrudRepository<Comment, Long> {
	Comment findByCommentNo(long commentNo);
	List<Comment> findAllByStoryAndDeleted(Story story, boolean isDeleted);
	@Transactional
	void deleteAllByStory(Story story);
	
}
