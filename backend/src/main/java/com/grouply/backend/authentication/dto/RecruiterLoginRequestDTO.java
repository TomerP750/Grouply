package com.grouply.backend.authentication.dto;

import lombok.Data;

@Data
public class RecruiterLoginRequestDTO {

    private String email;
    private String password;

}
