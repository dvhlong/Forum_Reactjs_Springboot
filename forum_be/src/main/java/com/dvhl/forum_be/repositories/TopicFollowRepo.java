package com.dvhl.forum_be.repositories;

import com.dvhl.forum_be.model.TopicFollow;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicFollowRepo extends JpaRepository<TopicFollow,Long> {
    
}
