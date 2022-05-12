package com.dvhl.forum_be.Security;

import com.dvhl.forum_be.model.User;
import com.dvhl.forum_be.repositories.JwtRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    @Autowired
    JwtRepository jwtRepository;
    
    @Override
    public UserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException { //lay thong tin user khi nhan token
        User user = jwtRepository.findByUsername(username);
        if(user==null){
            throw new UsernameNotFoundException(username);
        } else {
            return new UserDetailsImpl((User)user);
        }
        
    }
    
}
