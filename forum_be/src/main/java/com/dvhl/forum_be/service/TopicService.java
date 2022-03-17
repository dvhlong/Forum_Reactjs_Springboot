package com.dvhl.forum_be.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Topic;
import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.TopicRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
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
    }
    public long countPost(long id){
        return topicRepo.count();
    }
    public ResponseEntity<Response> createNewTopic(long created_acc,Topic newTopic){
        Optional <User>foundAcc=accountRepo.findById(created_acc);
        newTopic.setCreated_acc(foundAcc.get());
        Date jDate=new Date();
        long currentTime=jDate.getTime();
        newTopic.setCreated_at(new Timestamp(currentTime));
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Added",topicRepo.save(newTopic)));
    }
    public ResponseEntity<Response> editTopic(long topic_id,long updated_acc,Topic updatedTopic){
        Date jDate=new Date();
        long currentTime=jDate.getTime();
        topicRepo.findById(topic_id).map(topic ->{
            topic.setUpdated_at(new Timestamp(currentTime));
            topic.setUpdated_acc(accountRepo.findById(updated_acc).get());
            if(updatedTopic.getTopicname()!=null)
            topic.setTopicname(updatedTopic.getTopicname());
            return topicRepo.save(topic);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Updated",""));
    }
    public ResponseEntity<Response> deleteTopic(long topic_id,long deleted_acc){
        Date jDate=new Date();
        long currentTime=jDate.getTime();
        topicRepo.findById(topic_id).map(topic ->{
            topic.setIsdeleted(true);
            topic.setDeleted_acc(accountRepo.findById(deleted_acc).get());
            topic.setDeleted_at(new Timestamp(currentTime));
            return topicRepo.save(topic);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Deleted",""));
    }
}
