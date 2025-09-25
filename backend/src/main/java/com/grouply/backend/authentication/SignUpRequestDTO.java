package com.grouply.backend.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class SignUpRequestDTO {

    private String firstName;
    private String lastName;
    @Min(6)
    private String username;
    @Email
    private String email;
    @Min(6) @Max(12)
    private String password;
    private String confirmPassword;

}
