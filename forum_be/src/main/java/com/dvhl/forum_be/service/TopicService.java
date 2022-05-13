package com.dvhl.forum_be.service;

// import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

// import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Topic;
import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.AccountRepository;
import com.dvhl.forum_be.repositories.PostRepository;
import com.dvhl.forum_be.repositories.TopicRepository;

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
    TopicRepository topicRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PostRepository postRepository;

    public Page<Topic> getTopicsPage(int page){
        return topicRepository.findAllByIsdeleted(PageRequest.of(page-1, 4),false);
    }

    public List<Topic> getTopics(){
        return topicRepository.findAllByIsdeleted(false);
    }

    public long countPost(long topicId){
        return postRepository.countByTopic(topicId);
    }

    public ResponseEntity<Response> insertTopic(long createdUserId,Topic newTopic){
        Optional <User>uOptional=accountRepository.findById(createdUserId);
        newTopic.setCreated_acc(uOptional.get());
        newTopic.setCreated_at(timeService.getCurrentTimestamp());
        topicRepository.save(newTopic);
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Added",""));
    }

    public ResponseEntity<Response> updateTopic(long updatedUserId,Topic updatedTopic){
        topicRepository.findById(updatedTopic.getId()).map(topic ->{
            topic.setUpdated_at(timeService.getCurrentTimestamp());
            topic.setUpdated_acc(accountRepository.findById(updatedUserId).get());
            if(updatedTopic.getTopicname()!=null)
            topic.setTopicname(updatedTopic.getTopicname());
            return topicRepository.save(topic);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Updated",""));
    }

    public ResponseEntity<Response> deleteTopic(long topicId,long deletedUserId){
        topicRepository.findById(topicId).map(topic ->{
            topic.setIsdeleted(true);
            topic.setDeleted_acc(accountRepository.findById(deletedUserId).get());
            topic.setDeleted_at(timeService.getCurrentTimestamp());
            return topicRepository.save(topic);
        });
        postService.deletePostWhenDeleteTopic(topicId, deletedUserId);
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Deleted",""));
    }
}
