package com.pd.danim.Repository;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.Photo;

public interface PhotoRepository extends CrudRepository<Photo, Long> {
	Photo findByPhotoNo(long photoNo);
	boolean existsByPhotoNo(long photoNo);
}
