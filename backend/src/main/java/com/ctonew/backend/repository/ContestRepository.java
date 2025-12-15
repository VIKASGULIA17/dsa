package com.ctonew.backend.repository;

import com.ctonew.backend.domain.Contest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;

public interface ContestRepository extends JpaRepository<Contest, Long> {

	@Query("select c from Contest c where c.startTime > :now order by c.startTime asc")
	List<Contest> findUpcoming(Instant now);

	@Query("select c from Contest c where c.startTime <= :now and c.endTime >= :now order by c.startTime asc")
	List<Contest> findActive(Instant now);
}
