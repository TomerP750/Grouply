package com.grouply.backend.authentication;

import com.grouply.backend.authentication.dto.*;
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
    public AuthResponseDTO signup(@RequestBody SignUpRequestDTO dto) throws InvalidInputException {
        return authService.signup(dto);
    }


    @PostMapping("/recruiter/login")
    public AuthResponseDTO login(@RequestBody RecruiterLoginRequestDTO dto) {
        return authService.recruiterLogin(dto);
    }

    @PostMapping("/recruiter/signup")
    public AuthResponseDTO recruiterSignup(@RequestBody RecruiterSignupRequestDTO dto) throws InvalidInputException {
        return authService.recruiterSignup(dto);
    }



}
