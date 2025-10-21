package com.grouply.backend.authentication.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecruiterLoginRequestDTO {

    private String email;
    private String password;

}
