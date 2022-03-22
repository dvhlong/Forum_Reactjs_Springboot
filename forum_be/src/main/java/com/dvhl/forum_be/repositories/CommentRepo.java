package com.dvhl.forum_be.repositories;

import java.util.List;

import com.dvhl.forum_be.model.Comment;
import com.dvhl.forum_be.model.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment,Long>{

    Page<Comment> findAllByPostAndIsdeleted(long post_id, boolean b, Pageable pageable);

    List<Comment> findAllByPostAndIsdeleted(Post post, boolean b);
    
}
