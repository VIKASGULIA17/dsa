package com.ctonew.backend.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.List;

public final class ContestDtos {
	private ContestDtos() {
	}

	public enum ContestStatus {
		UPCOMING,
		ACTIVE,
		ENDED
	}

	public record ContestProblemInput(
			@NotNull Long problemId,
			@Min(1) int position,
			@Min(0) int points
	) {
	}

	public record ContestCreateRequest(
			@NotBlank String title,
			String description,
			@NotNull Instant startTime,
			@NotNull Instant endTime,
			List<@Valid ContestProblemInput> problems
	) {
	}

	public record ContestProblemDto(
			long problemId,
			String title,
			int position,
			int points
	) {
	}

	public record ContestDto(
			long id,
			String title,
			String description,
			Instant startTime,
			Instant endTime,
			ContestStatus status,
			List<ContestProblemDto> problems
	) {
	}

	public record ContestRegistrationDto(
			long id,
			long contestId,
			String userId,
			Instant registeredAt
	) {
	}

	public record StandingRowDto(
			int rank,
			String userId,
			int totalPoints
	) {
	}

	public record StandingsDto(
			long contestId,
			List<StandingRowDto> rows
	) {
	}
}
