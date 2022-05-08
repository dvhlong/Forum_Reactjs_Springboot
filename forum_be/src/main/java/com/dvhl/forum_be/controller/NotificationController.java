package com.dvhl.forum_be.controller;

import com.dvhl.forum_be.model.Notification;
import com.dvhl.forum_be.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/notification")
public class NotificationController {
    @Autowired
    NotificationService notificationService;
    @GetMapping("/{receivedAcc}/page={page}")
    Page<Notification> getNotification(@PathVariable long receivedAcc,@PathVariable int page){
        return notificationService.getYourNotifications(receivedAcc, page);
    }
}
