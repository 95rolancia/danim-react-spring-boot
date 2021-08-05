package com.pd.danim.Repository;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.Dto.Photo;

public interface PhotoRepository extends CrudRepository<Photo, Long> {

}
