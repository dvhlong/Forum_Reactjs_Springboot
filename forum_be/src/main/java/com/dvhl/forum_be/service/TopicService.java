package com.dvhl.forum_be.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Topic;
import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.PostRepo;
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
    TimeService timeService;
    @Autowired
    PostService postService;
    @Autowired
    TopicRepo topicRepo;
    @Autowired
    AccountRepo accountRepo;
    @Autowired
    PostRepo postRepo;
    public Page<Topic> getAllTopics(int page){
        return topicRepo.findAllByIsdeleted(PageRequest.of(page-1, 4),false);
    }
    public List<Topic> getTopics(){
        return topicRepo.findAllByIsdeleted(false);
    }
    public long countPost(long topic_id){
        return postRepo.countByTopic(topic_id);
    }
    public ResponseEntity<Response> createNewTopic(long created_acc,Topic newTopic){
        Optional <User>foundAcc=accountRepo.findById(created_acc);
        newTopic.setCreated_acc(foundAcc.get());
        newTopic.setCreated_at(timeService.getCurrentTimestamp());
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Added",topicRepo.save(newTopic)));
    }
    public ResponseEntity<Response> editTopic(long updated_acc,Topic updatedTopic){
        topicRepo.findById(updatedTopic.getId()).map(topic ->{
            topic.setUpdated_at(timeService.getCurrentTimestamp());
            topic.setUpdated_acc(accountRepo.findById(updated_acc).get());
            if(updatedTopic.getTopicname()!=null)
            topic.setTopicname(updatedTopic.getTopicname());
            return topicRepo.save(topic);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Updated",""));
    }
    public ResponseEntity<Response> deleteTopic(long topic_id,long deleted_acc){
        topicRepo.findById(topic_id).map(topic ->{
            topic.setIsdeleted(true);
            topic.setDeleted_acc(accountRepo.findById(deleted_acc).get());
            topic.setDeleted_at(timeService.getCurrentTimestamp());
            return topicRepo.save(topic);
        });
        postService.deletePostWhenDeleteTopic(topic_id, deleted_acc);
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Deleted",""));
    }
}
