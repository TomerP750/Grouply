package com.grouply.backend.authentication.dto;

import lombok.Data;

@Data
public class RecruiterSignupRequestDTO {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private String companyName;
}
