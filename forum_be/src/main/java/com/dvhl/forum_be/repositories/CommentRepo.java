package com.dvhl.forum_be.repositories;

import com.dvhl.forum_be.model.Comment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment,Long>{
    
}
