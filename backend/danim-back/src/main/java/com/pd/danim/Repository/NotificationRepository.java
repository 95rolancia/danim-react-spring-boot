package com.pd.danim.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pd.danim.DTO.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

	List<Notification> findAllByToUserNo(Long toUserNo);

	Optional<Notification> findByFromUserNoAndToUserNoAndDataIdAndTypes(Long fromUserNo, Long toUserNo, Long dataId,
			String types);
}
