package com.grouply.backend.user;


import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.user.Dtos.DeleteUserDTO;
import com.grouply.backend.user.Dtos.UpdateUserDTO;
import com.grouply.backend.user.Dtos.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {

    void updateUser(Long userId ,UpdateUserDTO dto) throws ExistsException;

    void deleteUser(Long userId ,DeleteUserDTO dto) throws InvalidInputException;

    Page<UserDTO> findAllUsers(Pageable pageable);

    User findOneUser(Long id);
}
