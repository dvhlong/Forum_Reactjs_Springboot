package com.dvhl.forum_be.repositories;

import com.dvhl.forum_be.model.Topic;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepo extends JpaRepository<Topic,Long>{
    
}
