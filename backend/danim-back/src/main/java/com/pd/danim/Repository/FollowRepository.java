package com.pd.danim.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pd.danim.Dto.Follow;
import com.pd.danim.Dto.User;

public interface FollowRepository extends JpaRepository<Follow, Long>  {
	List<Follow> findAllByFollowNo(long userno);
	List<Follow> findAllByUser(User user);
}
