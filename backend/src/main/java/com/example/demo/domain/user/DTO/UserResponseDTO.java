package com.example.demo.domain.user.DTO;

import com.example.demo.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

// UserResponseDTO.java
@Getter
@AllArgsConstructor
public class UserResponseDTO {
    private final Long userId; // 식별자
    private final String name;
    private final String email;
    // 필요한 경우: private final String token;

    // User 엔티티를 받아 DTO로 변환하는 생성자 (::new 사용 가능)
    public UserResponseDTO(User user) {
        this.userId = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
    }
}