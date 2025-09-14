package com.madmaximillion.simplerewards.web.dto;

import java.time.Instant;

public class ChoreDtos {

    public record CreateChoreRequest(
            String title,
            String description,
            String scheduleType,
            boolean expiresEndOfPeriod,
            Long assignedChildId,
            String rewardType,
            double rewardValue,
            boolean isAdhoc,
            Instant dueDate
    ) {}

    public record ChoreResponse(
            Long id,
            String title,
            String description,
            String scheduleType,
            boolean expiresEndOfPeriod,
            Long assignedChildId,
            String rewardType,
            double rewardValue,
            String status,
            boolean isAdhoc,
            Instant dueDate
    ) {}
}