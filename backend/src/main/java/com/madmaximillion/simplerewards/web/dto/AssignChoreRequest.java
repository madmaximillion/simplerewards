package com.madmaximillion.simplerewards.web.dto;

import com.madmaximillion.simplerewards.domain.enums.RewardType;
import com.madmaximillion.simplerewards.domain.enums.ScheduleType;

import java.time.Instant;

public record AssignChoreRequest(
        String title,
        String description,
        ScheduleType scheduleType,
        boolean expiresEndOfPeriod,
        RewardType rewardType,
        double rewardValue,
        boolean isAdhoc,
        Instant dueDate
) {}