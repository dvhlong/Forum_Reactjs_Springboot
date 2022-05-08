package com.dvhl.forum_be.service;

// import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Notification;
import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.NotificationRepo;
import com.dvhl.forum_be.repositories.PostRepo;

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
    NotificationRepo notificationRepo;
    @Autowired
    AccountRepo accountRepo;
    @Autowired
    PostRepo postRepo;
    public Page<Notification> getYourNotifications(long received_acc,int page){
        Optional<User> foundUser=accountRepo.findById(received_acc);
        return notificationRepo.findByReceivedacc(foundUser.get(),PageRequest.of(page-1, 5));
    }
    public ResponseEntity<Response> notify(long notified_acc,long post_id,Notification newNotify){
        Optional<Post> foundPost=postRepo.findById(post_id);
        Optional<User> foundUser=accountRepo.findById(notified_acc);
        newNotify.setNotifiedacc(foundUser.get());
        newNotify.setPost(foundPost.get());
        newNotify.setNotifiedat(timeService.getCurrentTimestamp());
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Added",notificationRepo.save(newNotify)));
    }
}
