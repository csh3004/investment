package com.example.demo.domain.user;

import java.util.List;
import java.util.Optional;

import com.example.demo.domain.user.DTO.UserRequestDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User saveUser(UserRequestDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다: " + dto.getEmail());
        }
        User user = new User(dto.getName(), dto.getPassword(), dto.getEmail());
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if(user != null && user.getPassword().equals(password)){
            return user;
        }else{
            return null;
        }
    }
}
