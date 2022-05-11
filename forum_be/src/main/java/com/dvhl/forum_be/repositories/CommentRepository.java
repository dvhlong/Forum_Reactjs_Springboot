package com.dvhl.forum_be.repositories;

import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Comment;
import com.dvhl.forum_be.model.Post;

import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long>{

    Page<Comment> findAllByPostAndIsdeletedOrderByCreatedatDesc(Optional<Post> post, boolean isDeleted, Pageable pageable);

    Page<Comment> findAllByPostAndIsdeleted(Optional<Post> post, boolean isDelete, Pageable pageable);
    
    List<Comment> findAllByPostAndIsdeleted(Post post, boolean isDeleted);
    
}
