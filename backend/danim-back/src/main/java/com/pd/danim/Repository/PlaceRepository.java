package com.pd.danim.Repository;

import org.springframework.data.repository.CrudRepository;
import com.pd.danim.DTO.Place;

public interface PlaceRepository extends CrudRepository<Place, Long> {
	Place findByAddress(String address);

}
