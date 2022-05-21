package com.dvhl.forum_be.repositories;

import com.dvhl.forum_be.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JwtRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}
