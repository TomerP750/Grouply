package com.grouply.backend.authentication;

import com.grouply.backend.authentication.dto.*;
import com.grouply.backend.exceptions.InvalidInputException;

public interface IAuthService {

    AuthResponseDTO login(LoginRequestDTO dto);

    AuthResponseDTO signup(SignUpRequestDTO dto) throws InvalidInputException;

    AuthResponseDTO recruiterLogin(RecruiterLoginRequestDTO dto);

    AuthResponseDTO recruiterSignup(RecruiterSignupRequestDTO dto) throws InvalidInputException;

}
