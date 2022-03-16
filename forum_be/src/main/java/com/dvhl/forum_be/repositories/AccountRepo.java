package com.dvhl.forum_be.repositories;

import java.util.Optional;

import com.dvhl.forum_be.model.Account;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<Account,Long>{
    Optional<Account> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Optional<Account> findByEmail(String email);
}
