package com.ctonew.backend.service;

import com.ctonew.backend.domain.Contest;
import com.ctonew.backend.domain.Problem;
import com.ctonew.backend.domain.Submission;
import com.ctonew.backend.repository.ContestRepository;
import com.ctonew.backend.repository.ProblemRepository;
import com.ctonew.backend.repository.SubmissionRepository;
import com.ctonew.backend.web.dto.SubmissionDtos;
import com.ctonew.backend.web.exception.NotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SubmissionService {
	private final SubmissionRepository submissionRepository;
	private final ProblemRepository problemRepository;
	private final ContestRepository contestRepository;

	public SubmissionService(SubmissionRepository submissionRepository, ProblemRepository problemRepository, ContestRepository contestRepository) {
		this.submissionRepository = submissionRepository;
		this.problemRepository = problemRepository;
		this.contestRepository = contestRepository;
	}

	@PreAuthorize("isAuthenticated()")
	@Transactional
	public SubmissionDtos.SubmissionDto createSubmission(SubmissionDtos.SubmissionCreateRequest request) {
		String userId = currentUserId();
		Problem problem = problemRepository.findById(request.problemId())
				.orElseThrow(() -> new NotFoundException("Problem not found"));

		Contest contest = null;
		if (request.contestId() != null) {
			contest = contestRepository.findById(request.contestId())
					.orElseThrow(() -> new NotFoundException("Contest not found"));
		}

		Submission submission = new Submission(userId, problem, contest, request.language(), request.code());
		Submission saved = submissionRepository.save(submission);
		return toDto(saved);
	}

	@PreAuthorize("isAuthenticated()")
	@Transactional(readOnly = true)
	public Page<SubmissionDtos.SubmissionDto> listMySubmissions(Pageable pageable) {
		String userId = currentUserId();
		return submissionRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable).map(this::toDto);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@Transactional
	public SubmissionDtos.SubmissionDto recordVerdict(long submissionId, SubmissionDtos.VerdictUpdateRequest request) {
		Submission submission = submissionRepository.findById(submissionId)
				.orElseThrow(() -> new NotFoundException("Submission not found"));
		submission.setVerdict(request.verdict());
		submission.setScore(request.score());
		return toDto(submission);
	}

	private SubmissionDtos.SubmissionDto toDto(Submission s) {
		return new SubmissionDtos.SubmissionDto(
				s.getId(),
				s.getUserId(),
				s.getProblem().getId(),
				s.getContest() == null ? null : s.getContest().getId(),
				s.getLanguage(),
				s.getVerdict(),
				s.getScore(),
				s.getCreatedAt()
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
