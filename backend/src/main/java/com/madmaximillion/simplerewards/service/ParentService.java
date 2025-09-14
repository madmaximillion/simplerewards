package com.madmaximillion.simplerewards.service;

import com.madmaximillion.simplerewards.domain.Chore;
import com.madmaximillion.simplerewards.domain.User;
import com.madmaximillion.simplerewards.web.dto.AssignChoreRequest;

import java.util.List;

public interface ParentService {
    List<User> getChildrenForLoggedInParent();
    List<Chore> getChoresForChild(Long childId);
    Chore assignChoreToChild(Long childId, AssignChoreRequest request);
    Chore approveChore(Long choreId);
}
