package com.madmaximillion.simplerewards.service;

import com.madmaximillion.simplerewards.domain.Chore;
import com.madmaximillion.simplerewards.domain.User;
import com.madmaximillion.simplerewards.repo.ChoreRepository;
import com.madmaximillion.simplerewards.repo.UserRepository;
import com.madmaximillion.simplerewards.web.dto.AssignChoreRequest;
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
    public Chore assignChoreToChild(Long childId, AssignChoreRequest request) {
        User child = userRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Child not found"));
        User parent = getLoggedInParent();
        Chore chore = new Chore();
//        chore.setTitle(request.title());
//        chore.setDescription(request.description());
//        chore.setScheduleType(request.scheduleType());
//        chore.setExpiresEndOfPeriod(request.expiresEndOfPeriod());
//        chore.setCreatedByUserId(parent.getId());
//        chore.setAssignedChildId(child.getId());
//        chore.setRewardType(request.rewardType());
//        chore.setRewardValue(request.rewardValue());
//        chore.setStatus("TODO");
//        chore.setAdhoc(request.isAdhoc());
//        chore.setDueDate(request.dueDate());
//        chore.setStatus("PENDING");
        return choreRepository.save(chore);
    }

    private User getLoggedInParent() {
        // 1. Get username from the authentication object
        String username = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        // 2. Look up the user in the database
        User parent = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return parent;
    }


    @Override
    public Chore approveChore(Long choreId) {
        Chore chore = choreRepository.findById(choreId)
                .orElseThrow(() -> new RuntimeException("Chore not found"));
//        chore.setStatus("COMPLETED");
//        // Optionally add points to child
//        User child = chore.getAssignedChildId();
//        child.setPoints(child.getPoints() + chore.getReward());
//        userRepository.save(child);
        return choreRepository.save(chore);
    }
}