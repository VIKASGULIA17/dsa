package com.ctonew.backend.repository;

import com.ctonew.backend.domain.ContestRegistration;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContestRegistrationRepository extends JpaRepository<ContestRegistration, Long> {
    boolean existsByContestIdAndUserId(long contestId, String userId);

    Optional<ContestRegistration> findByContestIdAndUserId(long contestId, String userId);

    List<ContestRegistration> findByContestIdOrderByRegisteredAtAsc(long contestId);
}
