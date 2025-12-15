package com.ctonew.backend.service;

import com.ctonew.backend.domain.Contest;
import com.ctonew.backend.domain.ContestProblem;
import com.ctonew.backend.domain.ContestRegistration;
import com.ctonew.backend.domain.Problem;
import com.ctonew.backend.repository.ContestRegistrationRepository;
import com.ctonew.backend.repository.ContestRepository;
import com.ctonew.backend.repository.ProblemRepository;
import com.ctonew.backend.web.dto.ContestDtos;
import com.ctonew.backend.web.exception.NotFoundException;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;

@Service
public class ContestService {
    private final ContestRepository contestRepository;
    private final ProblemRepository problemRepository;
    private final ContestRegistrationRepository registrationRepository;

    public ContestService(ContestRepository contestRepository, ProblemRepository problemRepository, ContestRegistrationRepository registrationRepository) {
        this.contestRepository = contestRepository;
        this.problemRepository = problemRepository;
        this.registrationRepository = registrationRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public ContestDtos.ContestDto createContest(ContestDtos.ContestCreateRequest request) {
        if (request.endTime().isBefore(request.startTime()) || request.endTime().equals(request.startTime())) {
            throw new IllegalArgumentException("endTime must be after startTime");
        }

        Contest contest = new Contest(request.title(), request.description(), request.startTime(), request.endTime());

        if (request.problems() != null && !request.problems().isEmpty()) {
            List<ContestDtos.ContestProblemInput> sorted = request.problems().stream()
                    .sorted(Comparator.comparingInt(ContestDtos.ContestProblemInput::position))
                    .toList();
            contest.clearProblems();
            for (ContestDtos.ContestProblemInput p : sorted) {
                Problem problem = problemRepository.findById(p.problemId())
                        .orElseThrow(() -> new NotFoundException("Problem not found"));
                contest.addProblem(new ContestProblem(problem, p.position(), p.points()));
            }
        }

        Contest saved = contestRepository.save(contest);
        return toDto(saved, Instant.now());
    }

    @Transactional(readOnly = true)
    public List<ContestDtos.ContestDto> listContests(String filter) {
        Instant now = Instant.now();
        List<Contest> contests;
        if ("active".equalsIgnoreCase(filter)) {
            contests = contestRepository.findActive(now);
        } else if ("upcoming".equalsIgnoreCase(filter)) {
            contests = contestRepository.findUpcoming(now);
        } else {
            contests = contestRepository.findAll();
        }

        return contests.stream()
                .sorted(Comparator.comparing(Contest::getStartTime))
                .map(c -> toDto(c, now))
                .toList();
    }

    @PreAuthorize("isAuthenticated()")
    @Transactional
    public ContestDtos.ContestRegistrationDto registerCurrentUser(long contestId) {
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(() -> new NotFoundException("Contest not found"));
        String userId = currentUserId();

        ContestRegistration existing = registrationRepository.findByContestIdAndUserId(contestId, userId).orElse(null);
        if (existing != null) {
            return new ContestDtos.ContestRegistrationDto(existing.getId(), contestId, existing.getUserId(), existing.getRegisteredAt());
        }

        ContestRegistration registration = new ContestRegistration(contest, userId);
        ContestRegistration saved = registrationRepository.save(registration);
        return new ContestDtos.ContestRegistrationDto(saved.getId(), contestId, saved.getUserId(), saved.getRegisteredAt());
    }

    @Transactional(readOnly = true)
    public ContestDtos.StandingsDto getStandings(long contestId) {
        if (!contestRepository.existsById(contestId)) {
            throw new NotFoundException("Contest not found");
        }
        List<ContestRegistration> registrations = registrationRepository.findByContestIdOrderByRegisteredAtAsc(contestId);
        List<ContestDtos.StandingRowDto> rows = java.util.stream.IntStream.range(0, registrations.size())
                .mapToObj(i -> new ContestDtos.StandingRowDto(i + 1, registrations.get(i).getUserId(), 0))
                .toList();
        return new ContestDtos.StandingsDto(contestId, rows);
    }

    private ContestDtos.ContestDto toDto(Contest contest, Instant now) {
        ContestDtos.ContestStatus status;
        if (contest.getStartTime().isAfter(now)) {
            status = ContestDtos.ContestStatus.UPCOMING;
        } else if (contest.getEndTime().isBefore(now)) {
            status = ContestDtos.ContestStatus.ENDED;
        } else {
            status = ContestDtos.ContestStatus.ACTIVE;
        }

        List<ContestDtos.ContestProblemDto> problems = contest.getProblems().stream()
                .sorted(Comparator.comparingInt(ContestProblem::getPosition))
                .map(cp -> new ContestDtos.ContestProblemDto(cp.getProblem().getId(), cp.getProblem().getTitle(), cp.getPosition(), cp.getPoints()))
                .toList();

        return new ContestDtos.ContestDto(
                contest.getId(),
                contest.getTitle(),
                contest.getDescription(),
                contest.getStartTime(),
                contest.getEndTime(),
                status,
                problems
        );
    }

    private String currentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new IllegalStateException("No authenticated user");
        }
        return authentication.getName();
    }
}
