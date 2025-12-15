package com.ctonew.backend.web.controller;

import com.ctonew.backend.service.SubmissionService;
import com.ctonew.backend.web.dto.PageDto;
import com.ctonew.backend.web.dto.SubmissionDtos;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {
	private final SubmissionService submissionService;

	public SubmissionController(SubmissionService submissionService) {
		this.submissionService = submissionService;
	}

	@PostMapping
	public SubmissionDtos.SubmissionDto createSubmission(@Valid @RequestBody SubmissionDtos.SubmissionCreateRequest request) {
		return submissionService.createSubmission(request);
	}

	@GetMapping
	public PageDto<SubmissionDtos.SubmissionDto> listMySubmissions(@PageableDefault(size = 20) Pageable pageable) {
		Page<SubmissionDtos.SubmissionDto> page = submissionService.listMySubmissions(pageable);
		return PageDto.from(page);
	}

	@PutMapping("/{submissionId}/verdict")
	public SubmissionDtos.SubmissionDto updateVerdict(
			@PathVariable long submissionId,
			@Valid @RequestBody SubmissionDtos.VerdictUpdateRequest request
	) {
		return submissionService.recordVerdict(submissionId, request);
	}
}
