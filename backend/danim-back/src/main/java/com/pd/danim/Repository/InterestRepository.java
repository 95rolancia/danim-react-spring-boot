package com.pd.danim.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.Interest;
import com.pd.danim.DTO.User;

public interface InterestRepository extends CrudRepository<Interest, Long> {


}
