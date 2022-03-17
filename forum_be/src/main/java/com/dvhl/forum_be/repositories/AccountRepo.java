package com.dvhl.forum_be.repositories;

import java.util.Optional;

import com.dvhl.forum_be.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<User,Long>{
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    User findByUsernameAndPassword(String username,String password);
    
}
