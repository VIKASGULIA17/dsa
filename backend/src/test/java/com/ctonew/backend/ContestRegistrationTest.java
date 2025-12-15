package com.ctonew.backend;

import com.ctonew.backend.domain.Contest;
import com.ctonew.backend.domain.Difficulty;
import com.ctonew.backend.domain.Problem;
import com.ctonew.backend.repository.ContestRegistrationRepository;
import com.ctonew.backend.repository.ContestRepository;
import com.ctonew.backend.repository.ProblemRepository;
import com.ctonew.backend.service.ContestService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class ContestRegistrationTest {
    @Autowired
    ContestService contestService;

    @Autowired
    ContestRepository contestRepository;

    @Autowired
    ProblemRepository problemRepository;

    @Autowired
    ContestRegistrationRepository registrationRepository;

    @Test
    @WithMockUser(username = "alice", roles = "USER")
    void registerContest_isIdempotentPerUser() {
        problemRepository.save(new Problem("A + B", "Compute sum", Difficulty.EASY));
        Contest contest = contestRepository.save(new Contest(
                "Weekly #1",
                null,
                Instant.now().plusSeconds(3600),
                Instant.now().plusSeconds(7200)
        ));

        var r1 = contestService.registerCurrentUser(contest.getId());
        var r2 = contestService.registerCurrentUser(contest.getId());

        assertThat(r2.id()).isEqualTo(r1.id());
        assertThat(registrationRepository.findByContestIdOrderByRegisteredAtAsc(contest.getId())).hasSize(1);
        assertThat(r1.userId()).isEqualTo("alice");
    }
}
