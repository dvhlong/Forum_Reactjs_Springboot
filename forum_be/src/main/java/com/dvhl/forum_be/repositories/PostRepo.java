package com.dvhl.forum_be.repositories;

import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Topic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.util.Streamable;



public interface PostRepo extends JpaRepository<Post,Long>{


    Page<Post> findAllByIsdeletedAndIsapprovedOrderByCreatedatDesc(boolean b, boolean c, Pageable pageable);

    

    Page<Post> findAllByCreatedaccAndIsdeletedAndIsapproved(long acc_id, boolean b, boolean c, PageRequest of);

    Optional<Post> findByIdAndIsdeleted(long post_id, boolean b);


    long countByTopic(long topic_id);

    List<Post> findAllByTopic(Topic topic);



    Page<Post> findAllByTopicAndIsdeletedAndIsapprovedOrderByCreatedatDesc(Topic topic, boolean b, boolean c,Pageable pageable);



    // Page<Post> findAllByIsdeletedAndIsapprovedAndCreatedaccUsernameContainingOrIsdeletedAndIsapprovedAndTitleContainingOrderByCreatedatDesc(boolean b, boolean c, String key1,boolean b1, boolean c1, String key2, Pageable pageable);
    
    @Query("SELECT p"
            +" FROM Post p"
            +" WHERE p.isdeleted=false AND p.isapproved=true AND p.content LIKE %:key%"
            +" OR p.isdeleted=false AND p.isapproved=true AND p.title LIKE %:key%"
            +" OR p.isdeleted=false AND p.isapproved=true AND p.createdacc.username LIKE %:key%"
            +" Order By p.createdat desc")
    Page<Post> getPostsWithKeyword(@Param("key") String key,Pageable pageable);
    
    
}
