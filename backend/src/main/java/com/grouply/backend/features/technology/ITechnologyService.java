package com.grouply.backend.features.technology;

import com.grouply.backend.features.technology.dto.TechnologyDTO;

import java.util.List;

public interface ITechnologyService {

    List<TechnologyDTO> allTechnologies();

    void deleteTechnology(Long techId);

}
