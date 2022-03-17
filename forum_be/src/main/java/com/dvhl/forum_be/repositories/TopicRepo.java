package com.dvhl.forum_be.repositories;

import com.dvhl.forum_be.model.Topic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepo extends JpaRepository<Topic,Long>{

    Page<Topic> findAllByIsdeleted(boolean b, PageRequest of);
    
}
