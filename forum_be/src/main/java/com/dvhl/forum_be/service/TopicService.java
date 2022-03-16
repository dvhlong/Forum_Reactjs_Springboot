package com.dvhl.forum_be.service;

import java.util.List;

import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Topic;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.TopicRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TopicService {
    @Autowired
    TopicRepo topicRepo;
    @Autowired
    AccountRepo accountRepo;
    public Page<Topic> getAllTopics(int page){
        return topicRepo.findAllByIsdeleted(false,PageRequest.of(page-1, 5));
    }public long countPost(long id){
        return 0;
    }
    public ResponseEntity<Response> createNewTopic(long create_acc,Topic newTopic){
        return null;
    }
    public ResponseEntity<Response> editTopic(long topic_id,long updated_acc,Topic updatedTopic){
        return null;
    }
    public ResponseEntity<Response> delateTopic(long topic_id,long deleted_acc){
        return null;
    }
}
