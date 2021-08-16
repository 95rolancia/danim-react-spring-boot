package com.pd.danim.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.Place;

public interface PlaceRepository extends CrudRepository<Place, Long> {
	Place findByAddress(String address);
	List<Place> findAllByNameContaining(String keyword);
	Place findByName(String name);
}
