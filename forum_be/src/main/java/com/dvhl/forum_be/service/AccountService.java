package com.dvhl.forum_be.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.Account;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Role;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.RoleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    AccountRepo accountRepo;
    @Autowired
    RoleRepo roleRepo;
    public List<Account> getAllAccounts(){
        return accountRepo.findAll();
    }
    public ResponseEntity<Response> registerAccount(Account newAcc){
        Optional<Account> foundAcc= accountRepo.findByUsername(newAcc.getUsername());
        if(foundAcc.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail","ten dang nhap da ton tai",""));
        } else {
            foundAcc=accountRepo.findByEmail(newAcc.getEmail());
            if(foundAcc.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail","Email da ton tai",""));
            } else {
                Role newRole=roleRepo.findByRolename("user");
                newAcc.setRole(newRole);
                Date jDate=new Date();
                long currentTime=jDate.getTime();
                newAcc.setCreated_at(new Timestamp(currentTime));
                return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da Dang ky thanh cong",accountRepo.save(newAcc)));
            } 
        }
    }
    public ResponseEntity<Response> changeAccountInfo(Account updatedAcc,long id){
        Date jDate=new Date();
        long currentTime=jDate.getTime();
        
        Optional<Account> foundAcc=accountRepo.findById(id).map(acc ->{
            acc.setName(updatedAcc.getName());
            acc.setBirthdate(updatedAcc.getBirthdate());
            acc.setPhone(updatedAcc.getPhone());
            acc.setUpdated_at(new Timestamp(currentTime));
            return accountRepo.save(acc);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da cap nhat",updatedAcc));
    }
    public ResponseEntity<Response> block(long id){
        Optional<Account> foundAcc=accountRepo.findById(id).map(acc ->{
            if(acc.isIsblocked()==false) 
                acc.setIsblocked(true);
            else
                acc.setIsblocked(false);
            return accountRepo.save(acc);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da cap nhat",""));
    }
    public ResponseEntity<Response> changeRole(long id,Role updatedRole) {
        Optional<Account>foundAcc=accountRepo.findById(id).map(acc ->{
            acc.setRole(updatedRole);
            return accountRepo.save(acc);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da cap nhat",""));
    }
    public ResponseEntity<Response> changePass(long id,Account updatedAcc) {
        Optional<Account> foundAcc=accountRepo.findById(id).map(acc ->{
            acc.setPassword(updatedAcc.getPassword());
            return accountRepo.save(acc);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da cap nhat",""));
    }
}
