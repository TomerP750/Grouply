package com.grouply.backend.profile.dto;

import com.grouply.backend.position.Position;
import com.grouply.backend.position.dto.PositionDTO;
import com.grouply.backend.user.Dtos.UserDTO;
import com.grouply.backend.user.User;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class ProfileDTO {

    private Long id;

    private String about;
    private String bannerUrl;

    private List<PositionDTO> positions = new ArrayList<>();

    private UserDTO user;

}
