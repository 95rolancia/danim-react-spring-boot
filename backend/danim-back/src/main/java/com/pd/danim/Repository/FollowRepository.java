package com.pd.danim.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pd.danim.DTO.Follow;
import com.pd.danim.DTO.User;

public interface FollowRepository extends JpaRepository<Follow, Long>  {
	List<Follow> findAllByFollowUserNo(long userno);
	List<Follow> findAllByUser(User user);
}
