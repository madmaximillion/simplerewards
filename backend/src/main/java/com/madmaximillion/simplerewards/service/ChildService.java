package com.madmaximillion.simplerewards.service;

import com.madmaximillion.simplerewards.domain.User;
import com.madmaximillion.simplerewards.web.dto.CreateChildRequest;

public interface ChildService {
    User addChild(User parent, CreateChildRequest request);
    User getChild(Long childId);
}
