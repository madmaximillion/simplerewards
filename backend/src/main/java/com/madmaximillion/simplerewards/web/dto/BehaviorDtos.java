package com.madmaximillion.simplerewards.web.dto;

public class BehaviorDtos {

    public record CreateBehaviorEventRequest(
            Long childId,
            int points,
            String note
    ) {}
}