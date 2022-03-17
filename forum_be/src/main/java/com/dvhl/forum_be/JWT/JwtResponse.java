package com.dvhl.forum_be.JWT;

import com.dvhl.forum_be.model.User;

public class JwtResponse {
    private String token;
    private User acc;
    public JwtResponse() {
    }
    public JwtResponse(String token, User acc) {
        this.token = token;
        this.acc = acc;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public User getAcc() {
        return acc;
    }
    public void setAcc(User acc) {
        this.acc = acc;
    }
    
}
