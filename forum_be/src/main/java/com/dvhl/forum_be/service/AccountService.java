package com.dvhl.forum_be.service;

// import java.nio.file.Files;
// import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.Security.JwtResponse;
import com.dvhl.forum_be.Security.JwtUtils;
import com.dvhl.forum_be.Security.LoginRequest;
import com.dvhl.forum_be.Security.UserDetailsImpl;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Role;
import com.dvhl.forum_be.repositories.AccountRepository;
import com.dvhl.forum_be.repositories.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
// import org.springframework.http.HttpHeaders;
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
    AccountRepository accountRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    PasswordEncoder passwordEncoder;

    public List<Role> getRoles(){
        return roleRepository.findAll();
    }

    public Page<User> getAccountsPage(int page){
        int elementQuantityInPage=10;
        return accountRepository.getAccsPage(PageRequest.of(page-1, elementQuantityInPage));
    }

    public ResponseEntity<Response> registerAccount(User newUser){
        Optional<User> uOptional= accountRepository.findByUsername(newUser.getUsername());
        if(uOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail","ten dang nhap da ton tai",""));
        } else {
            uOptional=accountRepository.findByEmail(newUser.getEmail());
            if(uOptional.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail","Email da ton tai",""));
            } else {
                Role role=roleRepository.findByRolename("user");
                newUser.setRole(role);
                newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
                newUser.setCreated_at(timeService.getCurrentTimestamp());
                accountRepository.save(newUser);
                return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da Dang ky thanh cong",""));
            } 
        }
    }

    public ResponseEntity<Response> updateUser(User updatedUser,long userId){
        accountRepository.findById(userId).map(user ->{
            user.setName(updatedUser.getName());
            user.setBirthdate(updatedUser.getBirthdate());
            user.setPhone(updatedUser.getPhone());
            user.setUpdated_at(timeService.getCurrentTimestamp());
            return accountRepository.save(user);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da cap nhat",updatedUser));
    }

    public ResponseEntity<Response> blockOrUnblockUser(long userId){
        accountRepository.findById(userId).map(user ->{
            user.setIsblocked(!user.getIsblocked());
            return accountRepository.save(user);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da cap nhat",""));
    }

    public ResponseEntity<Response> updateUserRole(long userId,Role updatedRole) {
        Role role=roleRepository.findByRolename(updatedRole.getRolename());
        accountRepository.findById(userId).map(user ->{
            user.setRole(role);
            return accountRepository.save(user);
        });
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Da cap nhat",""));
    }

    public ResponseEntity<Response> updatePassword(long userId,User updatedUser) {
        accountRepository.findById(userId).map(user ->{
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            return accountRepository.save(user);
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

    public ResponseEntity<?> getUser(long userId){
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","OK",accountRepository.findById(userId)));
    } 

    public ResponseEntity<Response> uploadAvatar(MultipartFile file,long userId){
        try {
            String fileRename = userId+"."+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
            accountRepository.findById(userId).map(user->{
                if(user.getAvatar()==null){
                    user.setAvatar(fileRename);
                    user.setAvatarUrl("http://localhost:8080/files/"+fileRename);
                }else {
                    storageService.delete(user.getAvatar());
                    user.setAvatar(fileRename);
                    user.setAvatarUrl("http://localhost:8080/files/"+fileRename);
                }
                storageService.save(file,fileRename);
                return accountRepository.save(user);
            });
            return ResponseEntity.status(HttpStatus.OK).body(new Response("OK","Successful","Uploaded the file successfully: " + fileRename));
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
