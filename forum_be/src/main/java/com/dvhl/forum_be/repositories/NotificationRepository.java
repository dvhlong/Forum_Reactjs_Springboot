package com.dvhl.forum_be.repositories;

// import java.util.Optional;

import com.dvhl.forum_be.model.Notification;
import com.dvhl.forum_be.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Page<Notification> findByReceivedaccOrderByNotifiedatDesc(User receivedUser, Pageable pageable);

}
