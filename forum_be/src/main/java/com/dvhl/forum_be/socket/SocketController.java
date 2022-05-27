package com.dvhl.forum_be.socket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
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

    @MessageMapping("/updatePostsToApprove")
    @SendTo("/receivedUpdatePostsToApprove")
    String updatePostsNotApprove() {
        return reloadPageRequest;
    }

    @MessageMapping("/notify/{receivedUserId}")
    void updateNotification(@DestinationVariable long receivedUserId) {
        simpMessagingTemplate.convertAndSend("/updateNotification/" + receivedUserId, reloadPageRequest);
    }

}
