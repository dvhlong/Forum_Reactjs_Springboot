package com.dvhl.forum_be.controller;

import java.util.List;

import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Topic;
import com.dvhl.forum_be.service.TopicService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// @CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(path = "/topic")
public class TopicController {

    @Autowired
    TopicService topicService;

    @GetMapping("/page={page}")
    Page<Topic> getTopicsPage(@PathVariable int page) {
        return topicService.getTopicsPage(page);
    }

    @GetMapping("/all")
    List<Topic> getTopics() {
        return topicService.getTopics();
    }

    @GetMapping("/amount/{topicId}")
    long postAmount(@PathVariable long topicId) {
        return topicService.countPost(topicId);
    }

    @PreAuthorize("hasAuthority('admin') or hasAuthority('mod')")
    @PostMapping("/createTopic/{createdUserId}")
    ResponseEntity<Response> insertTopic(@PathVariable long createdUserId, @RequestBody Topic newTopic) {
        return topicService.insertTopic(createdUserId, newTopic);
    }

    @PreAuthorize("hasAuthority('admin') or hasAuthority('mod')")
    @PutMapping("/editTopic/{updatedUserId}")
    ResponseEntity<Response> updateTopic(@PathVariable long updatedUserId, @RequestBody Topic updatedTopic) {
        return topicService.updateTopic(updatedUserId, updatedTopic);
    }

    @PreAuthorize("hasAuthority('admin') or hasAuthority('mod')")
    @DeleteMapping("/deleteTopic/{topicId}/{deletedUserId}")
    ResponseEntity<Response> deleteTopic(@PathVariable long topicId, @PathVariable long deletedUserId) {
        return topicService.deleteTopic(topicId, deletedUserId);
    }
}