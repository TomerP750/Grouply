package com.grouply.backend.features.authentication;

import com.grouply.backend.authentication.dto.*;
import com.grouply.backend.features.authentication.dto.AuthResponseDTO;
import com.grouply.backend.features.authentication.dto.LoginRequestDTO;
import com.grouply.backend.features.authentication.dto.SignUpRequestDTO;
import com.grouply.backend.shared.exceptions.InvalidInputException;

public interface IAuthService {

    AuthResponseDTO login(LoginRequestDTO dto);

    AuthResponseDTO signup(SignUpRequestDTO dto) throws InvalidInputException;

//    void logout(String refreshToken);

}
