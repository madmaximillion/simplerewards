package com.madmaximillion.simplerewards.repo;

import com.madmaximillion.simplerewards.domain.Chore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChoreRepository extends JpaRepository<Chore, Long> {
    List<Chore> findByAssignedChildId(Long childId);
}