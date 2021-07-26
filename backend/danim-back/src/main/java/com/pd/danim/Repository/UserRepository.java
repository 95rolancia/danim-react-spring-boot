package com.pd.danim.Repository;

import org.springframework.data.repository.CrudRepository;

import com.pd.danim.Dto.User;

public interface UserRepository extends CrudRepository<User, Long> {
	User findByUserno(long userno);
	boolean existsByNickname(String nickname);
}
