package com.madmaximillion.simplerewards.repo;

import com.madmaximillion.simplerewards.domain.BehaviorEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BehaviorEventRepository extends JpaRepository<BehaviorEvent, Long> {
}