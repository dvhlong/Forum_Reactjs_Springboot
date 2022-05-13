package com.dvhl.forum_be.repositories;

import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Topic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;




public interface PostRepository extends JpaRepository<Post,Long>{


    Page<Post> findAllByIsdeletedAndIsapprovedOrderByCreatedatDesc(boolean isDeleted, boolean isApproved, Pageable pageable);

    Page<Post> findAllByCreatedaccAndIsdeletedAndIsapproved(long createdUserId, boolean isDeleted, boolean isApproved, Pageable pageable);

    Optional<Post> findByIdAndIsdeleted(long postId, boolean isDeleted);

    long countByTopic(long topicId);

    List<Post> findAllByTopic(Topic topic);

    Page<Post> findAllByTopicAndIsdeletedAndIsapprovedOrderByCreatedatDesc(Topic topic, boolean isDeleted, boolean isApproved,Pageable pageable);

    @Query("SELECT p"
            +" FROM Post p"
            +" WHERE p.isdeleted=false AND p.isapproved=true AND p.content LIKE %:key%"
            +" OR p.isdeleted=false AND p.isapproved=true AND p.title LIKE %:key%"
            +" OR p.isdeleted=false AND p.isapproved=true AND p.createdacc.username LIKE %:key%"
            +" Order By p.createdat desc")
    Page<Post> getPostsByKeyword(@Param("key") String keyword,Pageable pageable);
    
    
}
