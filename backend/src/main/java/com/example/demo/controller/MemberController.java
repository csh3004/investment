package com.example.demo.controller;

import com.example.demo.service.MemberService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;

    // 회원가입 요청을 받은 API
    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {
        memberService.signup(request.getEmail(), request.getPassword(), request.getName());
        return "회원가입 성공!";
    }

    // 프론트에서 보낼 데이터를 담는 바구니 (DTO라고 부릅니다)
    @Data
    static class SignupRequest {
        private String email;
        private String password;
        private String name;
    }
}
