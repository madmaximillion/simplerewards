package com.madmaximillion.simplerewards.repo;

import com.madmaximillion.simplerewards.domain.Chore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChoreRepository extends JpaRepository<Chore, Long> {
    // For ParentController: get all chores for a specific child
    List<Chore> findByAssignedChildId(Long childId);

    // For ParentController: get all chores created by a specific parent
    List<Chore> findByCreatedByUserId(Long parentId);

    // For ChildController: get all chores for the logged-in child
    List<Chore> findByAssignedChildIdAndStatusIn(Long childId, List<String> statuses);

    // Optional: sum of rewardValue for approved POINTS chores (for points calculation)
//    @Query("SELECT COALESCE(SUM(c.rewardValue), 0) FROM Chore c " +
//            "WHERE c.assignedChildId = :childId " +
//            "AND c.status = 'APPROVED' " +
//            "AND UPPER(c.rewardType) = 'POINTS'")
//    double sumApprovedPointsByChild(Long childId);


}