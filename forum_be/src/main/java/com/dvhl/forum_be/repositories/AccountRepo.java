package com.dvhl.forum_be.repositories;

import java.util.Optional;

import com.dvhl.forum_be.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccountRepo extends JpaRepository<User,Long>{
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    User findByUsernameAndPassword(String username,String password);
    @Query("SELECT u FROM User u WHERE u.role.rolename<>'admin' ORDER BY u.id asc")
    Page<User>getAllAcc(Pageable pageable);
}
