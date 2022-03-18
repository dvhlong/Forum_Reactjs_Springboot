package com.dvhl.forum_be.repositories;

import java.util.List;

import com.dvhl.forum_be.model.Comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment,Long>{

    Page<Comment> findAllByPostAndIsdeleted(long post_id, boolean b, PageRequest of);

    List<Comment> findAllByPostAndIsdeleted(long post_id, boolean b);
    
}
