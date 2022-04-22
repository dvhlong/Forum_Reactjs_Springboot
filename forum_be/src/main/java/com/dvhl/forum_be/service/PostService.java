package com.dvhl.forum_be.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Comment;
import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Topic;
import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.CommentRepo;
import com.dvhl.forum_be.repositories.PostRepo;
import com.dvhl.forum_be.repositories.TopicRepo;

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
    TopicRepo topicRepo;
    @Autowired
    AccountRepo accountRepo;
    @Autowired
    PostRepo postRepo;
    @Autowired
    CommentRepo commentRepo;
    public Optional<Post> getPostById(long post_id){
        return postRepo.findByIdAndIsdeleted(post_id,false);
    }
    public Page<Post> getAllPostByTopic(long topic_id,int page){
        return postRepo.findAllByTopicAndIsdeletedAndIsapproved(topic_id,false,true,PageRequest.of(page-1, 3));
    }
    public Page<Post> getAllPost(int page){
        return postRepo.findAllByIsdeletedAndIsapproved(false,true,PageRequest.of(page-1, 3));
    }
    public Page<Post> getAllPostNotApproved(int page){
        return postRepo.findAllByIsdeletedAndIsapproved(false,false,PageRequest.of(page-1, 3));
    }
    public Page<Post> getAllYourPostWaitingApproved(long acc_id,int page){
        return postRepo.findAllByCreatedaccAndIsdeletedAndIsapproved(acc_id,false,false,PageRequest.of(page-1, 5));
    }
    public ResponseEntity<Response> createNewPost(long topic_id,long acc_id,Post newPost){
        Optional<User> foundAcc=accountRepo.findById(acc_id);
        Optional<Topic> foundTopic=topicRepo.findById(topic_id);
        if(!foundAcc.get().getRole().getRolename().equals("user")){
        newPost.setIsapproved(true);
        }
        newPost.setCreated_acc(foundAcc.get());
        newPost.setTopic(foundTopic.get());
        newPost.setCreated_at(timeService.getCurrentTimestamp());
        foundTopic.map(tp->{
            tp.setAmountTopic(tp.getAmountTopic()+1);
            return topicRepo.save(tp);
        });
        postRepo.save(newPost);
        return  ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Added",""));
    }
    public ResponseEntity<Response> approvePost(long acc_id,long post_id){
        Optional<User>foundAcc=accountRepo.findById(acc_id);
        postRepo.findById(post_id).map(p->{
            p.setIsapproved(true);
            p.setApproved_acc(foundAcc.get());
            p.setApproved_at(timeService.getCurrentTimestamp());
            return postRepo.save(p);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Approved",""));
    }
    public ResponseEntity<Response> editPost(long topic_id,long updated_acc,Post updatedPost){
        Optional<User> foundAcc=accountRepo.findById(updated_acc);
        Optional<Topic> foundTopic=topicRepo.findById(topic_id);
        postRepo.findById(updatedPost.getId()).map(p->{
            if(updatedPost.getTitle()!=null)
            p.setTitle(updatedPost.getTitle());
            if(updatedPost.getContent()!=null)
            p.setContent(updatedPost.getContent());
            p.setTopic(foundTopic.get());
            p.setUpdated_acc(foundAcc.get());
            p.setUpdated_at(timeService.getCurrentTimestamp());
            return postRepo.save(p);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Updated",""));
    }
    public ResponseEntity<Response> deletePost(long post_id,long deleted_acc){
        System.out.println("check");
        Optional<User> foundAcc=accountRepo.findById(deleted_acc);
        Optional<Post>fountPost=postRepo.findById(post_id).map(p->{
            p.setDeleted_acc(foundAcc.get());
            p.setIsdeleted(true);
            p.setDeleted_at(timeService.getCurrentTimestamp());
            // topicRepo.findById(p.getTopic().getId()).map(tp->{
            //     tp.setAmountTopic(tp.getAmountTopic()-1);
            //     return topicRepo.save(tp);
            // });

            return postRepo.save(p);
        });
        commentService.deleteCommentWhenDeletePost(post_id, deleted_acc);
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Deleted",fountPost));
    }
    public ResponseEntity<Response> deletePostWhenDeleteTopic(Long topic_id,long deleted_acc){
        Optional<Topic> foundTopic=topicRepo.findById(topic_id);
        List<Post> found=postRepo.findAllByTopic(foundTopic.get());
        Optional<User> foundAcc=accountRepo.findById(deleted_acc);
        Timestamp timeDelete=timeService.getCurrentTimestamp();
        if(found.size()>0)
        for(Post p:found){
            p.setDeleted_acc(foundAcc.get());
            p.setDeleted_at(timeDelete);
            p.setIsdeleted(true);
            postRepo.save(p);
        }
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Deleted",""));
    }
}
