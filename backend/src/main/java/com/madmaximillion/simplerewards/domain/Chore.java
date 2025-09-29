package com.madmaximillion.simplerewards.domain;

import com.madmaximillion.simplerewards.domain.enums.ChoreStatus;
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
    @Column(nullable = false)
    private String title;
    private String description;
    @Column(nullable = false)
    private ScheduleType scheduleType;
    @Column(nullable = false)
    private boolean expiresEndOfPeriod = false;
    @Column(nullable = false)
    private RewardType rewardType;
    @Column(nullable = false)
    private double rewardValue;
    @Column(nullable = false)
    private ChoreStatus status;
    @Column(nullable = false)
    private boolean isAdhoc = false;
    private Instant dueDate;
    @Column(nullable = false)
    private Instant createdAt = Instant.now();
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_child_id")
    private User assignedChild;
}