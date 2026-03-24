package com.example.demo.domain.user.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Getter
@NoArgsConstructor
public class UserRequestDTO {

    @NonNull
    private String name;

    @NonNull
    private String password;

    @NonNull
    private String email;
}
