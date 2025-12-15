package com.ctonew.backend;

import com.ctonew.backend.domain.Difficulty;
import com.ctonew.backend.service.ProblemService;
import com.ctonew.backend.web.dto.ProblemDtos;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class ProblemServiceTest {
    @Autowired
    ProblemService problemService;

    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    void listProblems_supportsQueryDifficultyAndTagFilters() {
        problemService.createProblem(new ProblemDtos.ProblemUpsertRequest(
                "Two Sum",
                "Given an array of integers...",
                Difficulty.EASY,
                java.util.List.of("array", "hashmap"),
                java.util.List.of(new ProblemDtos.ProblemExampleInput("[2,7,11,15]", "9", null, 1)),
                java.util.List.of()
        ));

        problemService.createProblem(new ProblemDtos.ProblemUpsertRequest(
                "Longest Path",
                "Find the longest path in a directed graph...",
                Difficulty.HARD,
                java.util.List.of("graph"),
                null,
                null
        ));

        var page1 = problemService.listProblems("sum", null, null, PageRequest.of(0, 10));
        assertThat(page1.getTotalElements()).isEqualTo(1);
        assertThat(page1.getContent().get(0).title()).isEqualTo("Two Sum");

        var page2 = problemService.listProblems(null, Difficulty.HARD, null, PageRequest.of(0, 10));
        assertThat(page2.getTotalElements()).isEqualTo(1);
        assertThat(page2.getContent().get(0).title()).isEqualTo("Longest Path");

        var page3 = problemService.listProblems(null, null, "graph", PageRequest.of(0, 10));
        assertThat(page3.getTotalElements()).isEqualTo(1);
        assertThat(page3.getContent().get(0).title()).isEqualTo("Longest Path");
    }
}
