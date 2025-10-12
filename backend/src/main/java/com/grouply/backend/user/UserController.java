package com.grouply.backend.user;

import com.grouply.backend.exceptions.ExistsException;
import com.grouply.backend.exceptions.InvalidInputException;
import com.grouply.backend.exceptions.UnauthorizedException;
import com.grouply.backend.security.CustomUserDetails;
import com.grouply.backend.user.Dtos.ChangePasswordRequestDTO;
import com.grouply.backend.user.Dtos.DeleteUserDTO;
import com.grouply.backend.user.Dtos.UpdateUserDTO;
import com.grouply.backend.user.Dtos.UserDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping("search")
    public Page<UserDTO> searchUsers(@RequestParam(value = "query") String query,
                                     @RequestParam(value = "page", defaultValue = "0") int page,
                                     @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userService.searchUsers(query, pageable);
    }

    @GetMapping("/all")
    public Page<UserDTO> allUsers(@RequestParam(value = "page", defaultValue = "0") int page,
                                  @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userService.findAllUsers(pageable);
    }

    @GetMapping("/{id}")
    public User oneUser(@PathVariable Long id) {
        return userService.findOneUser(id);
    }

    @PutMapping("/update")
    public void updateUser(@AuthenticationPrincipal CustomUserDetails userDetails ,@Valid @RequestBody UpdateUserDTO dto) throws ExistsException {
        Long userId = userDetails.getId();
        userService.updateUser(userId ,dto);
    }

    @PatchMapping("/changeP")
    public void changePassword(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody ChangePasswordRequestDTO dto) throws InvalidInputException, UnauthorizedException {
        Long userId = userDetails.getId();
        userService.changePassword(userId, dto);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@AuthenticationPrincipal CustomUserDetails userDetails ,@RequestBody DeleteUserDTO dto) throws InvalidInputException {
        Long userId = userDetails.getId();
        userService.deleteUser(userId ,dto);
    }

    @GetMapping("/available/{username}")
    public boolean usernameAvailable(@PathVariable String username) {
        return userService.checkUsernameAvailability(username);
    }

    @GetMapping("/admin")
    public boolean isAdmin(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        return userService.isAdmin(userId);
    }

}
