package com.dvhl.forum_be.repositories;

import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Post;
import com.dvhl.forum_be.model.Topic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface PostRepo extends JpaRepository<Post,Long>{


    Page<Post> findAllByIsdeletedAndIsapproved(boolean b, boolean c, Pageable pageable);

    Page<Post> findAllByTopicAndIsdeletedAndIsapproved(long topic_id, boolean b, boolean c, PageRequest of);

    Page<Post> findAllByCreatedaccAndIsdeletedAndIsapproved(long acc_id, boolean b, boolean c, PageRequest of);

    Optional<Post> findByIdAndIsdeleted(long post_id, boolean b);


    long countByTopic(long topic_id);

    List<Post> findAllByTopic(Topic topic);

    
    
}
