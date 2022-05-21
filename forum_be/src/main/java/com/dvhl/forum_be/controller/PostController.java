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

// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/post")
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;

    @GetMapping("/{postId}")
    Optional<Post> getPost(@PathVariable long postId) {
        return postService.getPost(postId);
    }

    @GetMapping("/{postId}/comments/page={page}")
    Page<Comment> getCommentsPage(@PathVariable long postId, @PathVariable int page) {
        return commentService.getCommentsPage(page, postId);
    }

    @PreAuthorize("#userId == authentication.principal.id")
    @PostMapping("/{postId}/{userId}/{repliedCommentId}/addComment")
    ResponseEntity<Response> insertComment(@PathVariable long postId, @PathVariable long repliedCommentId,
            @PathVariable long userId, @RequestBody Comment newComment) {
        return commentService.insertComment(postId, userId, repliedCommentId, newComment);
    }

    @PreAuthorize("#updatedUserId == authentication.principal.id")
    @PutMapping("/{commentId}/{updatedUserId}/editComment")
    ResponseEntity<Response> updateComment(@PathVariable long commentId, @PathVariable long updatedUserId,
            @RequestBody Comment updatedComment) {
        return commentService.updateComment(commentId, updatedUserId, updatedComment);
    }

    @PreAuthorize("(#deletedUserId == authentication.principal.id) or hasAuthority('admin') or hasAuthority('mod')")
    @DeleteMapping("/{commentId}/{deletedUserId}/deleteComment")
    ResponseEntity<Response> deleteComment(@PathVariable long commentId, @PathVariable long deletedUserId) {
        return commentService.deleteComment(commentId, deletedUserId);
    }

    @GetMapping("/page={page}")
    Page<Post> getPostsPage(@PathVariable int page) {
        return postService.getPostsPage(page);
    }

    @GetMapping("/topic/{topicId}/page={page}")
    Page<Post> getPostByTopiPage(@PathVariable long topicId, @PathVariable int page) {
        return postService.getPostsByTopicPage(topicId, page);
    }

    @GetMapping("/key={keyword}/page={page}")
    Page<Post> getAllPostByKeywordPage(@PathVariable String keyword, @PathVariable int page) {
        return postService.getPostsByKeywordPage(keyword, page);
    }

    @PreAuthorize("hasAuthority('admin') or hasAuthority('mod')")
    @GetMapping("/approvePost/page={page}")
    Page<Post> getPostNotApprovePage(@PathVariable int page) {
        return postService.getPostsNotApprovedPage(page);
    }

    @PreAuthorize("#createdUserId == authentication.principal.id")
    @PostMapping("/createPost/{topicId}/{createdUserId}")
    ResponseEntity<Response> inserPost(@PathVariable long topicId, @PathVariable long createdUserId,
            @RequestBody Post newPost) {
        return postService.insertPost(topicId, createdUserId, newPost);
    }

    @PreAuthorize("#updatedUserId == authentication.principal.id")
    @PutMapping("/editPost/{updatedTopicId}/{updatedUserId}")
    ResponseEntity<Response> updatePost(@PathVariable long updatedTopicId, @PathVariable long updatedUserId,
            @RequestBody Post updatedPost) {
        return postService.updatePost(updatedTopicId, updatedUserId, updatedPost);
    }

    @PreAuthorize("(#deletedUserId == authentication.principal.id) or hasAuthority('admin') or hasAuthority('mod')")
    @DeleteMapping("/deletePost/{postId}/{deletedUserId}")
    ResponseEntity<Response> deletePost(@PathVariable long postId, @PathVariable long deletedUserId) {
        return postService.deletePost(postId, deletedUserId);
    }

    @PreAuthorize("hasAuthority('admin') or hasAuthority('mod')")
    @PutMapping("/approve/{approvedUserId}/{postId}")
    ResponseEntity<Response> approve(@PathVariable long approvedUserId, @PathVariable long postId) {
        return postService.approvePost(approvedUserId, postId);
    }
}
