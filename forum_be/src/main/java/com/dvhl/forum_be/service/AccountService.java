package com.dvhl.forum_be.service;

import java.util.List;
import java.util.Optional;

import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.model.UserDTO;
import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Role;
import com.dvhl.forum_be.model.RoleDTO;
import com.dvhl.forum_be.repositories.AccountRepository;
import com.dvhl.forum_be.repositories.RoleRepository;
import com.dvhl.forum_be.security.JwtResponse;
import com.dvhl.forum_be.security.JwtUtils;
import com.dvhl.forum_be.security.LoginRequest;
import com.dvhl.forum_be.security.UserDetailsImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    String successfulMessage = "Successful";

    String failMessage = "Fail";

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

    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    public Page<User> getAccountsPage(int page) {
        int elementQuantityInPage = 10;
        return accountRepository.getAccsPage(PageRequest.of(page - 1, elementQuantityInPage));
    }

    public ResponseEntity<Response> registerAccount(UserDTO newUser) {
        Optional<User> uOptional = accountRepository.findByUsername(newUser.getUsername());
        if (uOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail", "ten dang nhap da ton tai", ""));
        } else {
            uOptional = accountRepository.findByEmail(newUser.getEmail());
            if (uOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail", "Email da ton tai", ""));
            } else {
                insertUserToDatabase(newUser);
                return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Da Dang ky thanh cong", ""));
            }
        }
    }

    private void insertUserToDatabase(UserDTO newUser) {
        Role role = roleRepository.findByRolename("user");
        User user = new User();
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        user.setCreatedAt(timeService.getCurrentTimestamp());
        user.setUsername(newUser.getUsername());
        accountRepository.save(user);
    }

    public ResponseEntity<Response> updateUser(UserDTO updatedUser, long userId) {
        Optional<User> userOptional = accountRepository.findById(userId);
        if (userOptional.isPresent()) {
            userOptional.ifPresent(user -> updateUserIntoDatabase(updatedUser, user));
            return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", successfulMessage, updatedUser));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail", failMessage, updatedUser));
        }
    }

    private User updateUserIntoDatabase(UserDTO updatedUser, User user) {
        user.setName(updatedUser.getName());
        user.setBirthdate(updatedUser.getBirthdate());
        user.setPhone(updatedUser.getPhone());
        user.setUpdatedAt(timeService.getCurrentTimestamp());
        return accountRepository.save(user);
    }

    public ResponseEntity<Response> blockOrUnblockUser(long userId) {
        Optional<User> userOptional = accountRepository.findById(userId);
        if (userOptional.isPresent()) {
            userOptional.ifPresent(user -> {
                user.setIsblocked(!user.getIsblocked());
                accountRepository.save(user);
            });
            return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", successfulMessage, ""));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail", failMessage, ""));
        }
    }

    public ResponseEntity<Response> updateUserRole(long userId, RoleDTO updatedRole) {
        Role role = roleRepository.findByRolename(updatedRole.getRolename());
        Optional<User> userOptional = accountRepository.findById(userId);
        if (userOptional.isPresent()) {
            userOptional.ifPresent(user -> {
                user.setRole(role);
                accountRepository.save(user);
            });
            return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", successfulMessage, ""));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail", failMessage, ""));
        }
    }

    public ResponseEntity<Response> updatePassword(long userId, UserDTO updatedUser) {
        Optional<User> userOptional = accountRepository.findById(userId);
        if (userOptional.isPresent()) {
            userOptional.ifPresent(user -> {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                accountRepository.save(user);
            });
            return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", successfulMessage, ""));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(new Response("Fail", failMessage, ""));
        }
    }

    public ResponseEntity<JwtResponse> authenticateAccount(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken((UserDetailsImpl) authentication.getPrincipal());
        UserDetailsImpl accDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponse(jwt, accDetails));
    }

    public ResponseEntity<Response> getLogoutSuccess() {
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Da Dang Xuat", ""));
    }

    public ResponseEntity<Response> getUser(long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "OK", accountRepository.findById(userId)));
    }

    public ResponseEntity<Response> uploadAvatar(MultipartFile file, long userId) {
        try {
            String filename = file.getOriginalFilename();
            if (filename != null) {
                String fileRename = userId + "."
                        + filename.substring(filename.lastIndexOf(".") + 1);
                Optional<User> userOptional = accountRepository.findById(userId);
                if (userOptional.isPresent()) {
                    userOptional.ifPresent(user -> {
                        insertAvatarToDatabase(fileRename, user);
                        storageService.save(file, fileRename);
                        accountRepository.save(user);
                    });
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(new Response("OK", "Successful", "Uploaded the file successfully: " + fileRename));
                } else {
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(new Response("Fail", "Error", "Could not upload the file !"));
                }
            } else {
                throw new NullPointerException();
            }
        } catch (NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new Response("Fail", "Error", "Could not upload the file !"));
        }
    }

    private void insertAvatarToDatabase(String fileRename, User user) {
        if (isAvatarExisted(user)) {
            storageService.delete(user.getAvatar());
            user.setAvatar(fileRename);
            user.setAvatarUrl("http://localhost:8080/files/" + fileRename);
        } else {
            user.setAvatar(fileRename);
            user.setAvatarUrl("http://localhost:8080/files/" + fileRename);
        }
    }

    private boolean isAvatarExisted(User user) {
        return user.getAvatar() != null;
    }

    public ResponseEntity<Resource> loadAvatar(String filename) {
        Resource file = storageService.load(filename);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(file);
    }
}
