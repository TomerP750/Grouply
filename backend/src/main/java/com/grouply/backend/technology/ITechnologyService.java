package com.grouply.backend.technology;

import com.grouply.backend.technology.dto.TechnologyDTO;

import java.util.List;

public interface ITechnologyService {

    List<TechnologyDTO> allTechnologies();

    void deleteTechnology(Long techId);

}
