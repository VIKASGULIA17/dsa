package com.ctonew.backend.repository;

import com.ctonew.backend.domain.Problem;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProblemRepository extends JpaRepository<Problem, Long>, JpaSpecificationExecutor<Problem> {

    @EntityGraph(attributePaths = {"tags"})
    @Override
    Page<Problem> findAll(Specification<Problem> spec, Pageable pageable);

    @EntityGraph(attributePaths = {"tags", "examples", "solutions"})
    @Query("select p from Problem p where p.id = :id")
    Optional<Problem> findWithDetailsById(long id);
}
