package com.dvhl.forum_be.controller;

import java.util.Optional;

import com.dvhl.forum_be.model.Comment;
import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.service.CommentService;
import com.dvhl.forum_be.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/post")
public class PostController {
    @Autowired
    PostService postService;
    @Autowired
    CommentService commentService;
    @GetMapping("/{id}")
    Optional<Post> getPost(@PathVariable long id){
        return postService.getPostById(id);
    }
    @GetMapping("/{postid}/comments/page={page}")
    Page<Comment> getComments(@PathVariable long postid,@PathVariable int page){
        return commentService.getComments(page, postid);
    }
    @PostMapping("/{postid}/{accid}/{replyid}/addComment")
    ResponseEntity<Response> addComment(@PathVariable long postid,@PathVariable long replyid,@PathVariable long accid,@RequestBody Comment newComment ){
        return commentService.addComment(postid,accid,replyid,newComment);
    }
    @PutMapping("/{cmt_id}/{updated_acc}/editComment")
    ResponseEntity<Response> editComment(@PathVariable long cmt_id,@PathVariable long updated_acc,@RequestBody Comment updatedComment){
        return commentService.editComment(cmt_id, updated_acc, updatedComment);
    }
    @DeleteMapping("/{cmt_id}/{deleted_acc}/deleteComment")
    ResponseEntity<Response> deleteComment(@PathVariable long cmt_id,@PathVariable long deleted_acc){
        return commentService.deleteComment(cmt_id, deleted_acc);
    }
    @GetMapping("/page={page}")
    Page<Post> getAllPost(@PathVariable int page){
        return postService.getAllPost(page);
    }
    @GetMapping("/approvePost/page={page}")
    Page<Post> approvePost(@PathVariable int page){
        return postService.getAllPostNotApproved(page);
    }
    @PostMapping("/createPost/{topic_id}/{created_acc}")
    ResponseEntity<Response> createPost(@PathVariable long topic_id,@PathVariable long created_acc,@RequestBody Post newPost){
        return postService.createNewPost(topic_id, created_acc, newPost);
    }
    @PutMapping("/editPost/{topic_id}/{updated_acc}")
    ResponseEntity<Response> editPost(@PathVariable long topic_id,@PathVariable long updated_acc,@RequestBody Post updatedPost){
        return postService.editPost(topic_id, updated_acc, updatedPost);
    }
    @DeleteMapping("/deletePost/{post_id}/{deleted_acc}")
    ResponseEntity<Response> deletePost(@PathVariable long post_id,@PathVariable long deleted_acc){
        System.out.println("check");
        return postService.deletePost(post_id, deleted_acc);
    }
    @PutMapping("/approve/{acc_id}/{post_id}")
    ResponseEntity<Response> approve(@PathVariable long acc_id,@PathVariable long post_id){
        return postService.approvePost(acc_id, post_id);
    }
}
