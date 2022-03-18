package com.dvhl.forum_be.service;

import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.JWT.JwtResponse;
import com.dvhl.forum_be.JWT.JwtUtils;
import com.dvhl.forum_be.JWT.LoginRequest;
import com.dvhl.forum_be.JWT.UserDetailsImpl;
import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Role;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.RoleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    TimeService timeService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    AccountRepo accountRepo;
    @Autowired
    RoleRepo roleRepo;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    PasswordEncoder passwordEncoder;
    public List<Role> getRole(){
        return roleRepo.findAll();
    }
    public Page<User> getAllAccounts(int page){
        return accountRepo.findAll(PageRequest.of(page-1, 5));
    }
    public ResponseEntity<Response> registerAccount(User newAcc){
        Optional<User> foundAcc= accountRepo.findByUsername(newAcc.getUsername());
        if(foundAcc.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail","ten dang nhap da ton tai",""));
        } else {
            foundAcc=accountRepo.findByEmail(newAcc.getEmail());
            if(foundAcc.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail","Email da ton tai",""));
            } else {
                Role newRole=roleRepo.findByRolename("user");
                newAcc.setRole(newRole);
                newAcc.setPassword(passwordEncoder.encode(newAcc.getPassword()));
                newAcc.setCreated_at(timeService.getCurrentTimestamp());
                return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da Dang ky thanh cong",accountRepo.save(newAcc)));
            } 
        }
    }
    public ResponseEntity<Response> changeAccountInfo(User updatedAcc,long id){
        accountRepo.findById(id).map(acc ->{
            if(updatedAcc.getName()!=null)
            acc.setName(updatedAcc.getName());
            if(updatedAcc.getBirthdate()!=null)
            acc.setBirthdate(updatedAcc.getBirthdate());
            if(updatedAcc.getPhone()!=null)
            acc.setPhone(updatedAcc.getPhone());
            acc.setUpdated_at(timeService.getCurrentTimestamp());
            return accountRepo.save(acc);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da cap nhat",updatedAcc));
    }
    public ResponseEntity<Response> block(long id){
        accountRepo.findById(id).map(acc ->{
            if(acc.isIsblocked()==false) 
                acc.setIsblocked(true);
            else
                acc.setIsblocked(false);
            return accountRepo.save(acc);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da cap nhat",""));
    }
    public ResponseEntity<Response> changeRole(long id,Role updatedRole) {
        accountRepo.findById(id).map(acc ->{
            acc.setRole(updatedRole);
            return accountRepo.save(acc);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da cap nhat",""));
    }
    public ResponseEntity<Response> changePass(long id,User updatedAcc) {
        accountRepo.findById(id).map(acc ->{
            acc.setPassword(passwordEncoder.encode(updatedAcc.getPassword()));
            return accountRepo.save(acc);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da cap nhat",""));
    }
    public ResponseEntity<?> authenticateAccount(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken((UserDetailsImpl) authentication.getPrincipal());
        UserDetailsImpl accDetails = (UserDetailsImpl) authentication.getPrincipal();    
        return ResponseEntity.ok(new JwtResponse(jwt, accDetails)); 
    }
    public ResponseEntity<Response> getLogoutSuccess(){
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da Dang Xuat",""));
    }
}
