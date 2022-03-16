package com.dvhl.forum_be.repositories;

import com.dvhl.forum_be.model.Notification;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepo extends JpaRepository<Notification,Long>{
    
}
