package com.grouply.backend.authentication;

public interface IAuthService {

    AuthResponseDTO login(LoginRequestDTO dto);

    AuthResponseDTO signup(SignUpRequestDTO dto);

}
