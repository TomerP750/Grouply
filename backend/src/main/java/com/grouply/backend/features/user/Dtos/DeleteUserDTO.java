package com.grouply.backend.features.user.Dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteUserDTO {

    @NotBlank
    private String password;


}
