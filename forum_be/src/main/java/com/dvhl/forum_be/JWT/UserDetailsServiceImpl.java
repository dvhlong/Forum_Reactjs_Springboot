package com.dvhl.forum_be.JWT;

import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.JwtRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    @Autowired
    JwtRepo jwtRepo;
    @Override
    public UserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = jwtRepo.findByUsername(username);
        if(user==null){
            throw new UsernameNotFoundException(username);
        } else {
            return new UserDetailsImpl((User)user);
        }
        
    }
    
}
