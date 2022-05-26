package com.dvhl.forum_be.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import com.dvhl.forum_be.model.Notification;
import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.AccountRepository;
import com.dvhl.forum_be.repositories.NotificationRepository;
import com.dvhl.forum_be.repositories.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    TimeService timeService;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PostRepository postRepository;

    public Page<Notification> getNotificationsPage(long receivedUserId, int page) {
        int elementQuantityInPage = 5;
        Optional<User> uOptional = accountRepository.findById(receivedUserId);
        User receivedUser = null;
        if (uOptional.isPresent()) {
            receivedUser = uOptional.get();
        }
        return notificationRepository.findByReceivedaccOrderByNotifiedatDesc(receivedUser,
                PageRequest.of(page - 1, elementQuantityInPage));
    }

    public ResponseEntity<Response> insertNotification(long notifiedUserId, long receivedUserId, long postId,
            String notificationContent) {
        Notification newNotification = new Notification();
        Optional<Post> pOptional = postRepository.findById(postId);
        Optional<User> notifiedUserOptional = accountRepository.findById(notifiedUserId);
        Optional<User> receivedUserOptional = accountRepository.findById(receivedUserId);
        try {
            insertNotificationToDatabase(notificationContent, newNotification, pOptional, notifiedUserOptional,
                    receivedUserOptional);
        } catch (NoSuchElementException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Added", ""));
    }

    private void insertNotificationToDatabase(String notificationContent, Notification newNotification,
            Optional<Post> pOptional,
            Optional<User> notifiedUserOptional, Optional<User> receivedUserOptional) {
        User notifiedUser = null;
        User receivedUser = null;
        Post post = null;
        if (notifiedUserOptional.isPresent()) {
            notifiedUser = notifiedUserOptional.get();
        }
        if (receivedUserOptional.isPresent()) {
            receivedUser = receivedUserOptional.get();
        }
        if (pOptional.isPresent()) {
            post = pOptional.get();
        }
        newNotification.setNotifiedacc(notifiedUser);
        newNotification.setReceivedacc(receivedUser);
        newNotification.setPost(post);
        newNotification.setReaded(false);
        newNotification.setContent(notificationContent);
        newNotification.setNotifiedat(timeService.getCurrentTimestamp());
        notificationRepository.save(newNotification);
    }
}
