package com.example.demo.repository;

import com.example.demo.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    // 이메일로 회원을 찾는 메서드 (로그인할 때와 회원가입 중복 체크할 떄는 필수)
    Optional<Member> findByEmail(String email);

    // 이메일이 이미 존재하는지 확인하는 메서드
    boolean existsByEmail(String email);
}