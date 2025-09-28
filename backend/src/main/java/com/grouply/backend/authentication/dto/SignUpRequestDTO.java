package com.grouply.backend.authentication.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class SignUpRequestDTO {

    private AccountDTO accountDetails;
}
