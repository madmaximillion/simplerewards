package com.madmaximillion.simplerewards.web;

import com.madmaximillion.simplerewards.domain.Chore;
import com.madmaximillion.simplerewards.domain.User;
import com.madmaximillion.simplerewards.repo.ChoreRepository;
import com.madmaximillion.simplerewards.repo.UserRepository;
import com.madmaximillion.simplerewards.service.ChildService;
import com.madmaximillion.simplerewards.web.dto.AssignChoreRequest;
import com.madmaximillion.simplerewards.web.dto.ChildSummary;
import com.madmaximillion.simplerewards.web.dto.CreateChildRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

import static com.madmaximillion.simplerewards.domain.enums.RewardType.POINTS;

@RestController
@RequestMapping("/api/parent")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PARENT')")
public class ParentController {

    private final UserRepository userRepository;
    private final ChoreRepository choreRepository;
    private final ChildService childService;

    @GetMapping("/children")
    public ResponseEntity<List<ChildSummary>> getChildren() {
        User parent = getLoggedInParent();
        List<ChildSummary> children = userRepository.findByParentId(parent.getId()).stream()
                .map(ch -> new ChildSummary(ch.getId(), ch.getDisplayName(), ch.getPoints()))
                .toList();
        return ResponseEntity.ok(children);
    }

    @PostMapping("/children")
    public ResponseEntity<User> createChild(@AuthenticationPrincipal UserDetails principal,
                                            @RequestBody CreateChildRequest request) {
        User parent = getLoggedInParent();
        User createdChild = childService.addChild(parent, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdChild);
    }


    @GetMapping("/children/{childId}/chores")
    public ResponseEntity<List<Chore>> getChildChores(@PathVariable Long childId) {
//        validateChildOfParent(childId);
        return ResponseEntity.ok(choreRepository.findByAssignedChildId(childId));
    }

    @PostMapping("/children/{childId}/chores")
    public ResponseEntity<Chore> assignChore(@PathVariable Long childId,
                                             @RequestBody AssignChoreRequest request) {
        User parent = getLoggedInParent();
//        User child = validateChildOfParent(childId);

        Chore chore = new Chore();
        chore.setTitle(request.title());
        chore.setDescription(request.description());
        chore.setScheduleType(request.scheduleType());
        chore.setExpiresEndOfPeriod(request.expiresEndOfPeriod());
        chore.setCreatedByUserId(parent.getId());
        chore.setAssignedChildId(childId);
        chore.setRewardType(request.rewardType());
        chore.setRewardValue(request.rewardValue());
        chore.setStatus("TODO");
        chore.setAdhoc(request.isAdhoc());
        chore.setDueDate(request.dueDate());
        chore.setCreatedAt(Instant.now());

        return ResponseEntity.ok(choreRepository.save(chore));
    }

    @PostMapping("/chores/{choreId}/approve")
    public ResponseEntity<Chore> approveChore(@PathVariable Long choreId) {
        Chore chore = choreRepository.findById(choreId)
                .orElseThrow(() -> new RuntimeException("Chore not found"));

//        validateChildOfParent(chore.getAssignedChildId());

        if (!"AWAITING_PARENT".equals(chore.getStatus())) {
            return ResponseEntity.badRequest().build();
        }

        chore.setStatus("APPROVED");
        chore.setUpdatedAt(Instant.now());

        // Credit points if rewardType is POINTS
        if (POINTS.equals(chore.getRewardType())) {
            User child = userRepository.findById(chore.getAssignedChildId())
                    .orElseThrow(() -> new RuntimeException("Child not found"));
            child.setPoints(child.getPoints() + (int) chore.getRewardValue());
            userRepository.save(child);
        }

        return ResponseEntity.ok(choreRepository.save(chore));
    }

    private User getLoggedInParent() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Parent not found"));
    }

//    private User validateChildOfParent(Long childId) {
//        User parent = getLoggedInParent();
//        User child = userRepository.findById(childId)
//                .orElseThrow(() -> new RuntimeException("Child not found"));
//        if (child.getParentId() == null || !child.getParentId().equals(parent.getId())) {
//            throw new RuntimeException("Child not owned by this parent");
//        }
//        return child;
//    }
}