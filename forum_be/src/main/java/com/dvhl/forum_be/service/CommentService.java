package com.dvhl.forum_be.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Comment;
import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.CommentRepo;
import com.dvhl.forum_be.repositories.PostRepo;

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
    CommentRepo commentRepo;
    @Autowired
    AccountRepo accountRepo;
    @Autowired
    PostRepo postRepo;
    public Page<Comment> getAllCommentFromPost(long post_id,int page){
        return commentRepo.findAllByPostAndIsdeleted(post_id,false,PageRequest.of(page-1, 10));
    }
    public ResponseEntity<Response> addComment(long post_id,long created_acc,long replied_cmt,Comment newCmt){
        Optional<User> foundAcc=accountRepo.findById(created_acc);
        Optional<Post> foundPost=postRepo.findById(post_id);
        newCmt.setCreated_acc(foundAcc.get());
        newCmt.setPost(foundPost.get());
        newCmt.setCreated_at(timeService.getCurrentTimestamp());
        if(replied_cmt !=0){
            Optional<Comment> cmtReplied=commentRepo.findById(replied_cmt);
            newCmt.setReplied_cmt(cmtReplied.get());
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Added",commentRepo.save(newCmt)));
    }
    public ResponseEntity<Response> editComment(long cmt_id,long updated_acc,Comment updatedCmt){
        Optional<User> foundAcc=accountRepo.findById(updated_acc);
        commentRepo.findById(cmt_id).map(c->{
            c.setContent(updatedCmt.getContent());
            c.setUpdated_acc(foundAcc.get());
            c.setUpdated_at(timeService.getCurrentTimestamp());
            return commentRepo.save(c);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("Ok","Updated",""));
    }
    public ResponseEntity<Response> deleteComment(long cmt_id,long deleted_acc){
        Optional<User> foundAcc=accountRepo.findById(deleted_acc);
        commentRepo.findById(cmt_id).map(c->{
            c.setIsdeleted(true);
            c.setDeleted_acc(foundAcc.get());
            c.setDeleted_at(timeService.getCurrentTimestamp());
            return commentRepo.save(c);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Deleted",""));
    }
    public void deleteCommentWhenDeletePost(long post_id,long deleted_acc){
        Optional<User> foundAcc=accountRepo.findById(deleted_acc);
        List<Comment> found=commentRepo.findAllByPostAndIsdeleted(post_id,false);
        Timestamp timeDelete=timeService.getCurrentTimestamp();
        for(Comment c:found){
            c.setIsdeleted(true);
            c.setDeleted_acc(foundAcc.get());
            c.setDeleted_at(timeDelete);
            commentRepo.save(c);
        }
    }
}
