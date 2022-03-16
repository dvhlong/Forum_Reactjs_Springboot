package com.dvhl.forum_be.repositories;

import com.dvhl.forum_be.model.Post;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepo extends JpaRepository<Post,Long>{
    
}
