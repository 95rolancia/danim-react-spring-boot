package com.pd.danim.Repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pd.danim.DTO.Follow;
import com.pd.danim.DTO.User;

public interface FollowRepository extends JpaRepository<Follow, Long>  {
	List<Follow> findAllByFollowUserNo(long userno);
	List<Follow> findAllByUser(User user);
	
	boolean existsByFollowUserNoAndUser(long followUserNo, User user);
	@Transactional
	int deleteByFollowUserNoAndUser(long followUserNo, User user);
	
	Optional<Follow> findByFollowUserNoAndUser(long followUserNo, User user);
}
