package com.dvhl.forum_be.repositories;

import com.dvhl.forum_be.model.Role;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRolename(String Rolename);
}
