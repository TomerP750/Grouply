package com.grouply.backend.authentication;

import lombok.Data;

@Data
public class SignUpRequestDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String confirmPassword;

}
