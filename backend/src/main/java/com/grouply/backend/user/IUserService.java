package com.grouply.backend.user;


import com.grouply.backend.user.Dtos.DeleteUserDTO;
import com.grouply.backend.user.Dtos.UpdateUserDTO;
import com.grouply.backend.user.Dtos.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {

    void updateUser(UpdateUserDTO dto);

    void deleteUser(DeleteUserDTO dto);

    Page<UserDTO> findAllUsers(Pageable pageable);

    User findOneUser(Long id);
}
