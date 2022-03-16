package com.dvhl.forum_be.controller;

import java.util.List;

import com.dvhl.forum_be.model.Account;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Role;
import com.dvhl.forum_be.service.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/accounts")
public class AccountController {
    @Autowired
    AccountService accSV;
    @GetMapping("")
    List<Account> getAllAccounts(){
        return accSV.getAllAccounts();
    }
    @PostMapping("/register")
    ResponseEntity<Response> registerAccount(@RequestBody Account newAcc){
        return accSV.registerAccount(newAcc);
    }
    @PutMapping("/{id}")
    ResponseEntity<Response> changeAccountInfo(@RequestBody Account updatedAcc,@PathVariable long id){
        return accSV.changeAccountInfo(updatedAcc,id);
    }
    @PutMapping("/block/{id}")
    ResponseEntity<Response> block(@PathVariable long id){
        return accSV.block(id);
    }
    @PutMapping("/changeRole/{id}")
    ResponseEntity<Response> changeRole(@RequestBody Role updatedRole,@PathVariable long id){
        return accSV.changeRole(id,updatedRole);
    }
    @PutMapping("/changePass/{id}")
    ResponseEntity<Response> changePass(@RequestBody Account updatedAcc,@PathVariable long id){
        return accSV.changePass(id,updatedAcc);
    }
}
