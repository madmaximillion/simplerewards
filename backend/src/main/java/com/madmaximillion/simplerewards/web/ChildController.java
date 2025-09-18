package com.madmaximillion.simplerewards.web;

import com.madmaximillion.simplerewards.domain.Chore;
import com.madmaximillion.simplerewards.service.ChoreService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/child")
public class ChildController {

    private final ChoreService service;

    public ChildController(ChoreService service) {
        this.service = service;
    }

    @GetMapping("/{childId}/chores")
    public List<Chore> getChoresByChild(@PathVariable Long childId) {
        return service.findByChild(childId);
    }
}