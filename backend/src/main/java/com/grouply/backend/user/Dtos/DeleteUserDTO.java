package com.grouply.backend.user.Dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteUserDTO {

    @NotBlank
    private String password;
    @NotBlank
    private String confirmPassword;

}
