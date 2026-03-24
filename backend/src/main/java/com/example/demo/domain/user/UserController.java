package com.example.demo.domain.user;

import java.util.List;

import com.example.demo.domain.user.DTO.UserRequestDTO;
import com.example.demo.domain.user.DTO.UserResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@Tag(name = "User API", description = "사용자 관리 관련 API")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Operation(summary = "사용자 조회", description = "ID를 통해 특정 사용자의 정보를 조회합니다.")
    @GetMapping("/list")
    private List<User> getUserList() {
        return userService.getAllUsers();
    }

    @Operation(summary = "회원가입", description = "회원가입")
    @PostMapping("/add")
    public ResponseEntity<User> addUser(@Valid @RequestBody UserRequestDTO dto) {
        User savedUser = userService.saveUser(dto);
        return ResponseEntity.ok(savedUser);
    }

    @Operation(summary = "로그인", description = "로그인 API")
    @PostMapping("/login")
    private UserResponseDTO login(@RequestBody UserRequestDTO dto){
        User user = userService.login(dto.getEmail(), dto.getPassword());
        return new UserResponseDTO(user);
    }
}
