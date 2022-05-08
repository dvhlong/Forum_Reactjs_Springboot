package com.dvhl.forum_be.service;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.Security.JwtResponse;
import com.dvhl.forum_be.Security.JwtUtils;
import com.dvhl.forum_be.Security.LoginRequest;
import com.dvhl.forum_be.Security.UserDetailsImpl;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Role;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.RoleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AccountService {
    @Autowired
    FilesStorageServiceImpl storageService;
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
        return accountRepo.getAllAcc(PageRequest.of(page-1, 10));
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
                accountRepo.save(newAcc);
                return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da Dang ky thanh cong",""));
            } 
        }
    }
    public ResponseEntity<Response> changeAccountInfo(User updatedAcc,long id){
        accountRepo.findById(id).map(acc ->{
            // if(updatedAcc.getName()!=null)
            acc.setName(updatedAcc.getName());
            // if(updatedAcc.getBirthdate()!=null)
            acc.setBirthdate(updatedAcc.getBirthdate());
            // if(updatedAcc.getPhone()!=null)
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
        Role foundRole=roleRepo.findByRolename(updatedRole.getRolename());
        accountRepo.findById(id).map(acc ->{
            acc.setRole(foundRole);
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
    public ResponseEntity<?> getUserInfo(long id){
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","OK",accountRepo.findById(id)));
    } 
    public ResponseEntity<Response> uploadAvatar(MultipartFile file,long id){
        try {
            String newfilename = id+"."+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
            accountRepo.findById(id).map(acc->{
                if(acc.getAvatar()==null){
                    acc.setAvatar(newfilename);
                    acc.setAvatarUrl("http://localhost:8080/files/"+newfilename);
                }else {
                    storageService.delete(acc.getAvatar());
                    acc.setAvatar(newfilename);
                    acc.setAvatarUrl("http://localhost:8080/files/"+newfilename);
                }
                storageService.save(file,newfilename);
                return accountRepo.save(acc);
            });
            return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Successful","Uploaded the file successfully: " + newfilename));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail","Error","Could not upload the file !"));
            
        }
    }
    public ResponseEntity<Resource> loadAvatar(String filename){
        Resource file = storageService.load(filename);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(file);
    }
}
