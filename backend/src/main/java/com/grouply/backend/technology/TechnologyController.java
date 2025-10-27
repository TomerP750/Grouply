package com.grouply.backend.technology;

import com.grouply.backend.technology.dto.TechnologyDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/all/page")
    public Page<TechnologyDTO> allTechnologiesPage(@RequestParam(value = "page", defaultValue = "0") int page,
                                                   @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return technologyService.allTechnologiesPage(pageable);

    }
}
