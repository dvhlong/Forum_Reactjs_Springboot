package com.dvhl.forum_be.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Comment;
import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.AccountRepository;
import com.dvhl.forum_be.repositories.CommentRepository;
import com.dvhl.forum_be.repositories.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    @Autowired
    TimeService timeService;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    NotificationService notificationService;

    public Page<Comment> getCommentsPage(int page, long postId) {
        int elementQuantityInPage = 5;
        Optional<Post> pOptional = postRepository.findByIdAndIsdeleted(postId, false);
        return commentRepository.findAllByPostAndIsdeletedOrderByCreatedatDesc(pOptional, false,
                PageRequest.of(page - 1, elementQuantityInPage));
    }

    public ResponseEntity<Response> insertComment(long postId, long createdUserId, long repliedCommentId,
            Comment newComment) {
        Optional<User> uOptional = accountRepository.findById(createdUserId);
        Optional<Post> pOptional = postRepository.findById(postId);
        newComment.setCreated_acc(uOptional.get());
        newComment.setPost(pOptional.get());
        newComment.setCreated_at(timeService.getCurrentTimestamp());
        notifyWhenComment(postId, createdUserId, repliedCommentId, newComment, pOptional);
        commentRepository.save(newComment);
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Added", ""));
    }

    private void notifyWhenComment(long postId, long createdUserId, long repliedCommentId, Comment newComment,
            Optional<Post> pOptional) {
        if (isReply(repliedCommentId)) {
            Optional<Comment> repliedCommentOptional = commentRepository.findById(repliedCommentId);
            newComment.setReplied_cmt(repliedCommentOptional.get());
            notificationService.insertNotification(createdUserId, repliedCommentOptional.get().getCreated_acc().getId(),
                    postId, "replied your comment in post");
        } else {
            notificationService.insertNotification(createdUserId, pOptional.get().getCreated_acc().getId(), postId,
                    "commented to your post");
        }
    }

    private boolean isReply(long repliedCommentId) {
        return repliedCommentId != 0;
    }

    public ResponseEntity<Response> updateComment(long commentId, long updatedUserId, Comment updatedComment) {
        Optional<User> uOptional = accountRepository.findById(updatedUserId);
        commentRepository.findById(commentId).map(comment -> {
            comment.setContent(updatedComment.getContent());
            comment.setUpdated_acc(uOptional.get());
            comment.setUpdated_at(timeService.getCurrentTimestamp());
            return commentRepository.save(comment);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("Ok", "Updated", ""));
    }

    public ResponseEntity<Response> deleteComment(long commentId, long deletedUserId) {
        Optional<User> uOptional = accountRepository.findById(deletedUserId);
        commentRepository.findById(commentId).map(comment -> {
            comment.setIsdeleted(true);
            comment.setDeleted_acc(uOptional.get());
            comment.setDeleted_at(timeService.getCurrentTimestamp());
            return commentRepository.save(comment);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Deleted", ""));
    }

    public void deleteCommentWhenDeletePost(long postId, long deletedUserId) {
        Optional<User> uOptional = accountRepository.findById(deletedUserId);
        Optional<Post> pOptional = postRepository.findById(postId);
        List<Comment> comments = commentRepository.findAllByPostAndIsdeleted(pOptional.get(), false);
        Timestamp timeDelete = timeService.getCurrentTimestamp();
        for (Comment comment : comments) {
            comment.setIsdeleted(true);
            comment.setDeleted_acc(uOptional.get());
            comment.setDeleted_at(timeDelete);
            commentRepository.save(comment);
        }
    }
}
