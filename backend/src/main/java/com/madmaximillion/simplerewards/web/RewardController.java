package com.madmaximillion.simplerewards.web;

import com.madmaximillion.simplerewards.domain.RewardLedger;
import com.madmaximillion.simplerewards.service.RewardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rewards")
@RequiredArgsConstructor
public class RewardController {

    private final RewardService service;

    @PostMapping
    public ResponseEntity<RewardLedger> create(@RequestBody RewardLedger r) {
        return ResponseEntity.ok(service.save(r));
    }
}