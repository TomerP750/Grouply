package com.grouply.backend.authentication;

import com.grouply.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService implements IAuthService {

    private final JwtService jwtService;

    @Override
    public AuthResponseDTO signup(SignUpRequestDTO dto) {



        LoginRequestDTO loginRequest = new LoginRequestDTO(dto.getEmail(), dto.getPassword());
        return login(loginRequest);
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO dto) {

        return null;
    }


}
