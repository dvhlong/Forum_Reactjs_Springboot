package com.dvhl.forum_be.JWT;

public class JwtResponse {
    private String token;
    private UserDetailsImpl acc;
    public JwtResponse() {
    }
    public JwtResponse(String token, UserDetailsImpl acc) {
        this.token = token;
        this.acc = acc;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public UserDetailsImpl getAcc() {
        return acc;
    }
    public void setAcc(UserDetailsImpl acc) {
        this.acc = acc;
    }
    
    
    
}
