package com.madmaximillion.simplerewards.web;

import com.madmaximillion.simplerewards.web.dto.DashboardDtos.WeeklySummary;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/child/{childId}/weekly-summary")
    public WeeklySummary getWeeklySummary(@PathVariable Long childId) {
        // Placeholder: return dummy data until service is implemented
        return new WeeklySummary(5, 10, 12.5, 20, 1, java.util.Map.of());
    }
}