package com.dvhl.forum_be.socket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SocketController {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;
    
    @MessageMapping("/updateTopic")
    @SendTo("/receivedUpdateTopic")
    String updateTopic(){
        return "reload";
    }

    @MessageMapping("/updatePosts")
    @SendTo("/receivedUpdatePosts")
    String updatePosts(){
        return "reload";
    }

    @MessageMapping("/updatePost/{postId}")
    void updatePost(@DestinationVariable long postId){
        simpMessagingTemplate.convertAndSend("/receivedUpdatePost/"+postId, "reload");
    }

    @MessageMapping("/updateComments/{postId}")
    void updateComments(@DestinationVariable long postId){
        simpMessagingTemplate.convertAndSend("/receivedUpdateComments/"+postId, "reload");
    }

    @MessageMapping("/updatePostsToApprove")
    @SendTo("/receivedUpdatePostsToApprove")
    String updatePostsNotApprove(){
        return "reload";
    }

    @MessageMapping("/notify/{receivedUserId}")
    void updateNotification(@DestinationVariable long receivedUserId){
        simpMessagingTemplate.convertAndSend("/updateNotification/"+receivedUserId, "reload");
    }
    
}
