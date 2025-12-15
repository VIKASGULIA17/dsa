package com.ctonew.backend.repository;

import com.ctonew.backend.domain.Submission;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
	Page<Submission> findByUserIdOrderByCreatedAtDesc(String userId, Pageable pageable);
}
