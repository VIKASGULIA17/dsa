package com.ctonew.backend.web.dto;

import com.ctonew.backend.domain.ProgrammingLanguage;
import com.ctonew.backend.domain.Verdict;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public final class SubmissionDtos {
	private SubmissionDtos() {
	}

	public record SubmissionCreateRequest(
			@NotNull Long problemId,
			Long contestId,
			@NotNull ProgrammingLanguage language,
			@NotBlank String code
	) {
	}

	public record SubmissionDto(
			long id,
			String userId,
			long problemId,
			Long contestId,
			ProgrammingLanguage language,
			Verdict verdict,
			Integer score,
			Instant createdAt
	) {
	}

	public record VerdictUpdateRequest(
			@NotNull Verdict verdict,
			Integer score
	) {
	}
}
