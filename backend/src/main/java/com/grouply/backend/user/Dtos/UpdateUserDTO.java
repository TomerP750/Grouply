package com.grouply.backend.user.Dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class UpdateUserDTO {

    @NotBlank
    @Length(min = 2, max = 30)
    private String firstName;

    @NotBlank
    @Length(min = 2, max = 30)
    private String lastName;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9._-]{5,15}$",
            message = "Username must be 6–15 characters and contain only letters, digits, '.', '-', or '_'")
    private String username;

    @NotBlank
    @Email
    private String email;
}
