package com.madmaximillion.simplerewards.service.impl;

import com.madmaximillion.simplerewards.domain.Chore;
import com.madmaximillion.simplerewards.domain.User;
import com.madmaximillion.simplerewards.web.dto.AssignChoreRequest;
import com.madmaximillion.simplerewards.repo.ChoreRepository;
import com.madmaximillion.simplerewards.repo.UserRepository;
import com.madmaximillion.simplerewards.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParentServiceImpl implements ParentService {

    private final UserRepository userRepository;
    private final ChoreRepository choreRepository;

    @Override
    public List<User> getChildrenForLoggedInParent() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User parent = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        return userRepository.findByParentId(parent.getId());
    }

    @Override
    public List<Chore> getChoresForChild(Long childId) {
        return choreRepository.findByAssignedToId(childId);
    }

    @Override
    public Chore assignChoreToChild(Long childId, AssignChoreRequest request) {
        User child = userRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Child not found"));
        Chore chore = new Chore();
        chore.setTitle(request.getName());
        chore.setRewardValue(request.getReward());
        chore.setAssignedChildId(child.getId());
        chore.setStatus("PENDING");
        return choreRepository.save(chore);
    }

    @Override
    public Chore approveChore(Long choreId) {
        Chore chore = choreRepository.findById(choreId)
                .orElseThrow(() -> new RuntimeException("Chore not found"));
        chore.setStatus("COMPLETED");
        // Optionally add points to child
        User child = chore.getAssignedTo();
        child.setPoints(child.getPoints() + chore.getReward());
        userRepository.save(child);
        return choreRepository.save(chore);
    }
}