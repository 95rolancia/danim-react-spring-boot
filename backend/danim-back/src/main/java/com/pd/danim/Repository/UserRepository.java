package com.pd.danim.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.DTO.Interest;
import com.pd.danim.DTO.User;

public interface UserRepository extends CrudRepository<User, Long> {
	User findByUserno(long userno);
	boolean existsByNickname(String nickname);
	User findByNickname(String nickname);	
	void save(Interest interest);

}
