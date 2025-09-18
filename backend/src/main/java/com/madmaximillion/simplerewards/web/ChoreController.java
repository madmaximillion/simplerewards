package com.madmaximillion.simplerewards.web;

import com.madmaximillion.simplerewards.domain.Chore;
import com.madmaximillion.simplerewards.service.ChoreService;
import com.madmaximillion.simplerewards.web.dto.ChoreDtos.CreateChoreRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chores")
public class ChoreController {

    private final ChoreService service;

    public ChoreController(ChoreService service) {
        this.service = service;
    }

//    @PostMapping
//    public ResponseEntity<Chore> create(@RequestBody CreateChoreRequest req) {
//        Chore c = new Chore();
//        c.setTitle(req.title());
//        c.setDescription(req.description());
//        c.setScheduleType(req.scheduleType());
//        c.setExpiresEndOfPeriod(req.expiresEndOfPeriod());
//        c.setAssignedChildId(req.assignedChildId());
//        c.setRewardType(req.rewardType());
//        c.setRewardValue(req.rewardValue());
//        c.setAdhoc(req.isAdhoc());
//        c.setDueDate(req.dueDate());
//        return ResponseEntity.ok(service.save(c));
//    }

    @GetMapping("/child/{childId}")
    public List<Chore> getByChild(@PathVariable Long childId) {
        return service.findByChild(childId);
    }
}