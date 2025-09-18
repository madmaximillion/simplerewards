package com.madmaximillion.simplerewards.domain;

import com.madmaximillion.simplerewards.domain.enums.RewardType;
import com.madmaximillion.simplerewards.domain.enums.ScheduleType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class Chore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private ScheduleType scheduleType; // DAILY or WEEKLY
    private boolean expiresEndOfPeriod;
    private Long createdByUserId;
    private Long assignedChildId;
    private RewardType rewardType; // MONEY, POINTS, TREAT
    private double rewardValue;
    private String status; // TODO, AWAITING_PARENT, APPROVED, REJECTED
    private boolean isAdhoc;
    private Instant dueDate;
    private Instant createdAt = Instant.now();
    private Instant updatedAt;
}