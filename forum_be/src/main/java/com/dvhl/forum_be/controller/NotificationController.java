package com.dvhl.forum_be.controller;

import com.dvhl.forum_be.model.Notification;
import com.dvhl.forum_be.repositories.AccountRepository;
import com.dvhl.forum_be.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    NotificationService notificationService;

    @Autowired
    AccountRepository accountRepository;

    @PreAuthorize("#receivedUserId == authentication.principal.id")
    @GetMapping("/notification/{receivedUserId}/page={page}")
    Page<Notification> getNotificationsPage(@PathVariable long receivedUserId, @PathVariable int page) {
        return notificationService.getNotificationsPage(receivedUserId, page);
    }

    @MessageMapping("/private-notification")
    @SendTo("/user/private")
    String receivedPrivateNotification(@Payload String username) {
        return "checkWebsocket";
    }

}
