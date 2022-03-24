package com.dvhl.forum_be.controller;

import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Topic;
import com.dvhl.forum_be.service.TopicService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(path = "/topic")
public class TopicController{
    @Autowired
    TopicService topicService;
    @GetMapping("/page={page}")
    Page<Topic> getAllTopics(@PathVariable int page){
        return topicService.getAllTopics(page);
    }
    @GetMapping("/amount/{topic_id}")
    long getAmountTopic(@PathVariable long topic_id){
        return topicService.countPost(topic_id);
    }
    @PreAuthorize("hasAuthority('admin') or hasAuthority('mod')")
    @PostMapping("/createTopic/{created_acc}")
    ResponseEntity<Response> createTopic(@PathVariable long created_acc,@RequestBody Topic newTopic){
        return topicService.createNewTopic(created_acc, newTopic);
    }
    @PreAuthorize("hasAuthority('admin') or hasAuthority('mod')")
    @PutMapping("/editTopic/{updated_acc}")
    ResponseEntity<Response> editTopic(@PathVariable long updated_acc,@RequestBody Topic updated_topic){
        return topicService.editTopic(updated_acc, updated_topic);
    }
    @PreAuthorize("hasAuthority('admin') or hasAuthority('mod')")
    @DeleteMapping("/deleteTopic/{topic_id}/{deleted_acc}")
    ResponseEntity<Response> deleteTopic(@PathVariable long topic_id,@PathVariable long deleted_acc){
        return topicService.deleteTopic(topic_id, deleted_acc);
    }
}