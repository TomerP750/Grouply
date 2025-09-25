package com.grouply.backend.authentication;

import com.grouply.backend.exceptions.InvalidInputException;

public interface IAuthService {

    AuthResponseDTO login(LoginRequestDTO dto);

    AuthResponseDTO signup(SignUpRequestDTO dto) throws InvalidInputException;

}
