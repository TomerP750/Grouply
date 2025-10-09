package com.grouply.backend.user.Dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class ChangePasswordRequestDTO {

    @Length(min = 6, max = 15, message = "Needs to be at least 6 characters or 15 maximum characters")
    @NotBlank
    private String password;

    @Length(min = 6, max = 15, message = "Needs to be at least 6 characters or 15 maximum characters")
    @NotBlank
    private String confirmPassword;
}
