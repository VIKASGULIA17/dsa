package com.ctonew.backend.repository;

import com.ctonew.backend.domain.ProblemTag;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ProblemTagRepository extends JpaRepository<ProblemTag, Long> {
	Optional<ProblemTag> findByName(String name);

	List<ProblemTag> findByNameIn(Collection<String> names);
}
