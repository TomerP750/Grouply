package com.grouply.backend.authentication;

import com.grouply.backend.authentication.dto.AuthResponseDTO;
import com.grouply.backend.authentication.dto.LoginRequestDTO;
import com.grouply.backend.authentication.dto.SignUpRequestDTO;
import com.grouply.backend.exceptions.InvalidInputException;

public interface IAuthService {

    AuthResponseDTO login(LoginRequestDTO dto);

    AuthResponseDTO signup(SignUpRequestDTO dto) throws InvalidInputException;

}
