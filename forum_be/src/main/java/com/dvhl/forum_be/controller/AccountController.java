package com.dvhl.forum_be.controller;

import java.util.List;

import javax.validation.Valid;

import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.model.UserDTO;
import com.dvhl.forum_be.security.JwtResponse;
import com.dvhl.forum_be.security.LoginRequest;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Role;
import com.dvhl.forum_be.model.RoleDTO;
import com.dvhl.forum_be.service.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/")
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/checkToken")
    ResponseEntity<Response> checkToken() {
        return ResponseEntity.status(HttpStatus.OK).body(new Response("200", "successful", ""));
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/getAllAcc/pages={page}")
    Page<User> getAccountsPage(@PathVariable int page) {
        return accountService.getAccountsPage(page);
    }

    @PreAuthorize("#userId == authentication.principal.id")
    @GetMapping("/getUserInfo/{userId}")
    ResponseEntity<Response> getUser(@PathVariable long userId) {
        return accountService.getUser(userId);
    }

    @PostMapping("/login")
    ResponseEntity<JwtResponse> authenticateAccount(@Valid @RequestBody LoginRequest loginRequest) {
        return accountService.authenticateAccount(loginRequest);
    }

    @PostMapping("/register")
    ResponseEntity<Response> registerAccount(@RequestBody UserDTO newUser) {
        return accountService.registerAccount(newUser);
    }

    @PreAuthorize("#userId == authentication.principal.id")
    @PutMapping("/changeAccInfo/{userId}")
    ResponseEntity<Response> changeAccountInfo(@RequestBody UserDTO updatedUser, @PathVariable long userId) {
        return accountService.updateUser(updatedUser, userId);
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/blockAcc/{userId}")
    ResponseEntity<Response> block(@PathVariable long userId) {
        return accountService.blockOrUnblockUser(userId);
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/changeAccRole/{userId}")
    ResponseEntity<Response> updateUserRole(@RequestBody RoleDTO updatedRole, @PathVariable long userId) {
        return accountService.updateUserRole(userId, updatedRole);
    }

    @PreAuthorize("#userId == authentication.principal.id")
    @PutMapping("/changeAccPass/{userId}")
    ResponseEntity<Response> changePass(@RequestBody UserDTO updatedUser, @PathVariable long userId) {
        return accountService.updatePassword(userId, updatedUser);
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/getAllRole")
    List<Role> getRoles() {
        return accountService.getRoles();
    }

    @GetMapping("/logoutsuccess")
    ResponseEntity<Response> getLogoutSuccess() {
        return accountService.getLogoutSuccess();
    }

    @PreAuthorize("#userId == authentication.principal.id")
    @PostMapping("/uploadAvatar/{userId}")
    ResponseEntity<Response> uploadAvatar(@PathVariable long userId, @RequestParam("avatar") MultipartFile file) {
        return accountService.uploadAvatar(file, userId);
    }

    @GetMapping("/files/{filename}")
    public ResponseEntity<Resource> loadAvatar(@PathVariable String filename) {
        return accountService.loadAvatar(filename);
    }
}
