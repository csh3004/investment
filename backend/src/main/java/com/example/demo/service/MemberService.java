package com.example.demo.service;

import com.example.demo.domain.Member;
import com.example.demo.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public Long signup(String email, String password, String name) {
        // 1. 중복 이메일 체크 (비즈니스 로직의 기본)
        if (memberRepository.existsByEmail(email)) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

        // 2. 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(password);

        // 3. 회원 저장
        Member member = Member.builder()
                .email(email)
                .password(encodedPassword)
                .name(name)
                .build();

        return memberRepository.save(member).getId();
    }
}
