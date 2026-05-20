package com.example.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Key key;
    private final long validityInMilliseconds;

    // application.yml에 적어둔 값을 가져옵니다.
    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey,
                            @Value("${jwt.expiration}") long validityInMilliseconds) {
        byte[] keyBytes = secretKey.getBytes();
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.validityInMilliseconds = validityInMilliseconds;
    }
    
    // 1. 토큰 생성 메서드 (로그인 성공 시 호출됨)
    public String createToken(String email) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setSubject(email)  // 토큰의 주인 (여기서는 이메일)
                .setIssuedAt(now)  // 발행 시간
                .setExpiration(validity)  // 만료 시간
                .signWith(key, SignatureAlgorithm.HS256)  // 비밀키로 서명
                .compact();
    }

    // 2. 토큰에서 이메일 추출하는 메서드 (API 요청 들어올 때 사용됨)
    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    // 3. 토큰이 유효한지 확인하는 메서드
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            // 실제 운영에서는 만료, 위조 등에 따라 디테일한 예외 처리를 하지만
            // 지금은 실패하면 일단 false를 리턴
            return false;
        }
    }

}