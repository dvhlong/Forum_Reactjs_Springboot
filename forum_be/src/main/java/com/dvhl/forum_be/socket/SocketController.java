package com.dvhl.forum_be.socket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SocketController {

    String reloadPageRequest = "reload";

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/updatePost/{postId}")
    void updatePost(@DestinationVariable long postId) {
        simpMessagingTemplate.convertAndSend("/receivedUpdatePost/" + postId, reloadPageRequest);
    }

    @MessageMapping("/updateComments/{postId}")
    void updateComments(@DestinationVariable long postId) {
        simpMessagingTemplate.convertAndSend("/receivedUpdateComments/" + postId, reloadPageRequest);
    }

    @MessageMapping("/updateNewPostsToApprove")
    @SendTo("/public/receivedUpdateNewPostsToApprove")
    String updateNewPostsNotApprove() {
        return reloadPageRequest;
    }

    @MessageMapping("/updatePostsToApprove")
    @SendTo("/public/receivedUpdatePostsToApprove")
    String updatePostsNotApprove() {
        return reloadPageRequest;
    }

    @MessageMapping("/{receivedUsername}")
    void updateNotification(@DestinationVariable String receivedUsername, @Payload String message) {
        simpMessagingTemplate.convertAndSendToUser(receivedUsername, "/updateNotification/", message);
    }

}
