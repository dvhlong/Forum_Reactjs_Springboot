package com.dvhl.forum_be.service;

import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Topic;
import com.dvhl.forum_be.model.TopicFollow;
import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.TopicFollowRepo;
import com.dvhl.forum_be.repositories.TopicRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TopicFollowService {
    @Autowired
    TimeService timeService;
    @Autowired
    TopicFollowRepo topicFollowRepo;
    @Autowired
    TopicRepo topicRepo;
    @Autowired
    AccountRepo accountRepo;
    public List<TopicFollow>getTopicFolllowedByAccId(long acc_id){
        return topicFollowRepo.findByAcc(acc_id);
    }
    public ResponseEntity<Response> addTopicFollow(long acc_id,long topic_id){
        Optional<User> foundUser=accountRepo.findById(acc_id);
        Optional<Topic> foundTopic=topicRepo.findById(topic_id);
        TopicFollow tf=new TopicFollow();
        tf.setAcc(foundUser.get());
        tf.setTopic(foundTopic.get());
        tf.setCreated_at(timeService.getCurrentTimestamp());
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Added",topicFollowRepo.save(tf)));
    }
    public ResponseEntity<Response> deleteTopicFollow(long acc_id,long topic_id){   
        topicFollowRepo.findByAccAndTopic(acc_id,topic_id).map(tf->{
            tf.setIsdeleted(true);
            tf.setDeleted_at(timeService.getCurrentTimestamp());
            return topicFollowRepo.save(tf);
        });
        return null;
    }
}
