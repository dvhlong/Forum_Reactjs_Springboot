package com.dvhl.forum_be.repositories;

import java.util.List;

import com.dvhl.forum_be.model.Notification;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepo extends JpaRepository<Notification,Long>{

    List<Notification> findAllByNotifiedacc(long notified_acc);
    
}
