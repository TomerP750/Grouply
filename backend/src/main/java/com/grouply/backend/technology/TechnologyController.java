package com.grouply.backend.technology;

import com.grouply.backend.technology.dto.TechnologyDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tech")
@RequiredArgsConstructor
public class TechnologyController {

    private final TechnologyService technologyService;


    @GetMapping("/all")
    public List<TechnologyDTO> allTechnologies() {
        return technologyService.allTechnologies();
    }
}
