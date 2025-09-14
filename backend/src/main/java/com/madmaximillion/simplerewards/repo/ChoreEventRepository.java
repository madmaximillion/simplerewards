package com.madmaximillion.simplerewards.repo;

import com.madmaximillion.simplerewards.domain.ChoreEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoreEventRepository extends JpaRepository<ChoreEvent, Long> {
}