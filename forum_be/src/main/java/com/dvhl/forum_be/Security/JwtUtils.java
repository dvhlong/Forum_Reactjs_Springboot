package com.dvhl.forum_be.Security;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class); //hien thi logger
	private String jwtSecret="SecretKey"; //thong tin cua token
	private int jwtExpirationMs=604800000; //thoi gian ton tai token (ms)
	public String generateJwtToken(UserDetailsImpl userDetailsImpl) { //tao token
		//Jwt token gom 3 phan:Header,Payload,Signature
		return Jwts.builder()
				.setSubject((userDetailsImpl.getUsername())) //dua thong tin username (bat ky) vao token de co the lay ra kiem tra ->PayLoad
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)) //dua thoi han vao token ->Payload
				.signWith(SignatureAlgorithm.HS512, jwtSecret) //dua thong tin bao mat vao token ->Signature
				.compact();
	}
	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject(); //lay username tu token
	}
	public boolean validateJwtToken(String authToken) { //kiem tra token
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
			return false;
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
			return false;
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
			return false;
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
			return false;
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
			return false;
		}
		// return false;
	}
}
