package com.dvhl.forum_be.repositories;

import java.util.List;

import com.dvhl.forum_be.model.TopicFollow;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicFollowRepo extends JpaRepository<TopicFollow,Long> {

    List<TopicFollow> findByAcc(long acc_id);
    
}
