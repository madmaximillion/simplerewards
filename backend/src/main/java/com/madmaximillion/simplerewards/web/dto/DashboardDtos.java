package com.madmaximillion.simplerewards.web.dto;

import java.util.Map;

public class DashboardDtos {

    public record WeeklySummary(
            int behaviorPointsWeek,
            int chorePointsWeek,
            double moneyPending,
            int pointsPending,
            int treatsPending,
            Map<String, Object> columns
    ) {}
}