package com.madmaximillion.simplerewards.controller;

import com.madmaximillion.simplerewards.domain.Chore;
import com.madmaximillion.simplerewards.domain.User;
import com.madmaximillion.simplerewards.web.dto.AssignChoreRequest;
import com.madmaximillion.simplerewards.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parent")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PARENT')")
public class ParentController {

    private final ParentService parentService;

    @GetMapping("/children")
    public ResponseEntity<List<User>> getChildren() {
        return ResponseEntity.ok(parentService.getChildrenForLoggedInParent());
    }

    @GetMapping("/children/{childId}/chores")
    public ResponseEntity<List<Chore>> getChildChores(@PathVariable Long childId) {
        return ResponseEntity.ok(parentService.getChoresForChild(childId));
    }

    @PostMapping("/children/{childId}/chores")
    public ResponseEntity<Chore> assignChore(
            @PathVariable Long childId,
            @RequestBody AssignChoreRequest request
    ) {
        return ResponseEntity.ok(parentService.assignChoreToChild(childId, request));
    }

    @PostMapping("/chores/{choreId}/approve")
    public ResponseEntity<Chore> approveChore(@PathVariable Long choreId) {
        return ResponseEntity.ok(parentService.approveChore(choreId));
    }
}