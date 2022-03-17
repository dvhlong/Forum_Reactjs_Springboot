package com.dvhl.forum_be.service;

import java.util.List;

import com.dvhl.forum_be.model.TopicFollow;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.TopicFollowRepo;
import com.dvhl.forum_be.repositories.TopicRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TopicFollowService {
    @Autowired
    TopicFollowRepo topicFollowRepo;
    @Autowired
    TopicRepo topicRepo;
    @Autowired
    AccountRepo accountRepo;
    public List<TopicFollow>getTopicFolllowedById(long acc_id){
        return topicFollowRepo.findByAcc(acc_id);
    }
}
