package com.madmaximillion.simplerewards.web;

import com.madmaximillion.simplerewards.domain.BehaviorEvent;
import com.madmaximillion.simplerewards.service.BehaviorService;
import com.madmaximillion.simplerewards.web.dto.BehaviorDtos.CreateBehaviorEventRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/behavior")
public class BehaviorController {

    private final BehaviorService service;

    public BehaviorController(BehaviorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BehaviorEvent> create(@RequestBody CreateBehaviorEventRequest req) {
        BehaviorEvent behaviorEvent = new BehaviorEvent();
        behaviorEvent.setChildId(req.childId());
        behaviorEvent.setPoints(req.points());
        behaviorEvent.setNote(req.note());
        return ResponseEntity.ok(service.save(behaviorEvent));
    }
}