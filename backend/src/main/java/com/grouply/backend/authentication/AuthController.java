package com.grouply.backend.authentication;

import com.grouply.backend.authentication.dto.AuthResponseDTO;
import com.grouply.backend.authentication.dto.LoginRequestDTO;
import com.grouply.backend.authentication.dto.SignUpRequestDTO;
import com.grouply.backend.exceptions.InvalidInputException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody LoginRequestDTO dto) {
        return authService.login(dto);
    }

    @PostMapping("/signup")
    public void signup(@RequestBody SignUpRequestDTO dto) throws InvalidInputException {
        authService.signup(dto);
    }

}
