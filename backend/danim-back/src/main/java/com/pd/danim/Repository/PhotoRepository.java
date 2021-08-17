package com.pd.danim.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.Photo;
import com.pd.danim.DTO.Story;
import com.pd.danim.DTO.SubStory;

public interface PhotoRepository extends CrudRepository<Photo, Long> {
	Photo findByPhotoNo(long photoNo);
	boolean existsByPhotoNo(long photoNo);
	boolean existsByFilename(String filename);
	Photo findByFilename(String filename);	
	List<Photo> findAllByAddressContaining(String address);
	List<Photo> findAllBySubstory(SubStory substory);
	List<Photo> findTop9ByAddressContaining(String address);
	@Transactional
	void deleteAllByStory(Story story);
}
