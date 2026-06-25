package com.grouply.backend.features.user;


import com.grouply.backend.features.user.Dtos.UserDTO;
import com.grouply.backend.shared.exceptions.ExistsException;
import com.grouply.backend.shared.exceptions.InvalidInputException;
import com.grouply.backend.features.user.Dtos.DeleteUserDTO;
import com.grouply.backend.features.user.Dtos.UpdateUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {

    void updateUser(Long userId ,UpdateUserDTO dto) throws ExistsException;

    void deleteUser(Long userId ,DeleteUserDTO dto) throws InvalidInputException;

    Page<UserDTO> findAllUsers(Pageable pageable);

    User findOneUser(Long id);
}
