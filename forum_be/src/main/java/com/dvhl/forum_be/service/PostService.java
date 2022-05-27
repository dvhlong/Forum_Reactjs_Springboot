package com.dvhl.forum_be.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Topic;
import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.AccountRepository;
import com.dvhl.forum_be.repositories.CommentRepository;
import com.dvhl.forum_be.repositories.PostRepository;
import com.dvhl.forum_be.repositories.TopicRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    TimeService timeService;

    @Autowired
    CommentService commentService;

    @Autowired
    TopicRepository topicRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    NotificationService notificationService;

    public Optional<Post> getPost(long postId) {
        return postRepository.findByIdAndIsdeleted(postId, false);
    }

    public Page<Post> getPostsByTopicPage(long topicId, int page) {
        int elementQuantityInPage = 5;
        Optional<Topic> tOptional = topicRepository.findById(topicId);
        return postRepository.findAllByTopicAndIsdeletedAndIsapprovedOrderByCreatedatDesc(tOptional.get(), false, true,
                PageRequest.of(page - 1, elementQuantityInPage));
    }

    public Page<Post> getPostsByKeywordPage(String keyword, int page) {
        int elementQuantityInPage = 5;
        return postRepository.getPostsByKeyword(keyword, PageRequest.of(page - 1, elementQuantityInPage));
    }

    public Page<Post> getPostsPage(int page) {
        int elementQuantityInPage = 5;
        return postRepository.findAllByIsdeletedAndIsapprovedOrderByCreatedatDesc(false, true,
                PageRequest.of(page - 1, elementQuantityInPage));
    }

    public Page<Post> getPostsNotApprovedPage(int page) {
        int elementQuantityInPage = 3;
        return postRepository.findAllByIsdeletedAndIsapprovedOrderByCreatedatDesc(false, false,
                PageRequest.of(page - 1, elementQuantityInPage));
    }

    public Page<Post> getPostsWaitingApprovedByUser(long userId, int page) {
        int elementQuantityInPage = 5;
        return postRepository.findAllByCreatedaccAndIsdeletedAndIsapproved(userId, false, false,
                PageRequest.of(page - 1, elementQuantityInPage));
    }

    public ResponseEntity<Response> insertPost(long topicId, long createdUserId, Post newPost) {
        Optional<User> uOptional = accountRepository.findById(createdUserId);
        Optional<Topic> tOptional = topicRepository.findById(topicId);
        if (!uOptional.get().getRole().getRolename().equals("user")) {
            newPost.setIsapproved(true);
        }
        newPost.setCreated_acc(uOptional.get());
        newPost.setTopic(tOptional.get());
        newPost.setCreated_at(timeService.getCurrentTimestamp());
        tOptional.map(topic -> {
            topic.setAmountTopic(topic.getAmountTopic() + 1);
            return topicRepository.save(topic);
        });
        postRepository.save(newPost);
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Added", ""));
    }

    public ResponseEntity<Response> approvePost(long approvedUserId, long postId) {
        Optional<User> uOptional = accountRepository.findById(approvedUserId);
        postRepository.findById(postId).map(post -> {
            post.setIsapproved(true);
            post.setApproved_acc(uOptional.get());
            post.setApproved_at(timeService.getCurrentTimestamp());
            notificationService.insertNotification(approvedUserId, post.getCreated_acc().getId(), postId,
                    "approved your post");
            return postRepository.save(post);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Approved", ""));
    }

    public ResponseEntity<Response> updatePost(long updatedTopicId, long updatedUserId, Post updatedPost) {
        Optional<User> uOptional = accountRepository.findById(updatedUserId);
        Optional<Topic> tOptional = topicRepository.findById(updatedTopicId);
        postRepository.findById(updatedPost.getId()).map(post -> {
            if (updatedPost.getTitle() != null)
                post.setTitle(updatedPost.getTitle());
            if (updatedPost.getContent() != null)
                post.setContent(updatedPost.getContent());
            post.setTopic(tOptional.get());
            post.setUpdated_acc(uOptional.get());
            post.setUpdated_at(timeService.getCurrentTimestamp());
            return postRepository.save(post);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Updated", ""));
    }

    public ResponseEntity<Response> deletePost(long postId, long deletedUserId) {
        Optional<User> uOptional = accountRepository.findById(deletedUserId);
        Optional<Post> pOptional = postRepository.findById(postId).map(post -> {
            post.setDeleted_acc(uOptional.get());
            post.setIsdeleted(true);
            post.setDeleted_at(timeService.getCurrentTimestamp());
            return postRepository.save(post);
        });
        // commentService.deleteCommentWhenDeletePost(post_id, deleted_acc);
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Deleted", pOptional));
    }

    public ResponseEntity<Response> deletePostWhenDeleteTopic(long topicId, long deletedUserId) {
        Optional<Topic> tOptional = topicRepository.findById(topicId);
        List<Post> posts = postRepository.findAllByTopic(tOptional.get());
        Optional<User> uOptional = accountRepository.findById(deletedUserId);
        Timestamp timeDelete = timeService.getCurrentTimestamp();
        if (posts.size() > 0)
            for (Post post : posts) {
                post.setDeleted_acc(uOptional.get());
                post.setDeleted_at(timeDelete);
                post.setIsdeleted(true);
                postRepository.save(post);
            }
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Deleted", ""));
    }
}
