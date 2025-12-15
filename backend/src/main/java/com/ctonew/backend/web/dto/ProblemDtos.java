package com.ctonew.backend.web.dto;

import com.ctonew.backend.domain.Difficulty;
import com.ctonew.backend.domain.ProgrammingLanguage;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public final class ProblemDtos {
	private ProblemDtos() {
	}

	public record ProblemListItemDto(
			long id,
			String title,
			Difficulty difficulty,
			List<String> tags
	) {
	}

	public record ProblemExampleDto(
			String input,
			String output,
			String explanation,
			int order
	) {
	}

	public record ProblemSolutionDto(
			ProgrammingLanguage language,
			String content,
			String explanation
	) {
	}

	public record ProblemDetailDto(
			long id,
			String title,
			String statement,
			Difficulty difficulty,
			List<String> tags,
			List<ProblemExampleDto> examples,
			List<ProblemSolutionDto> solutions
	) {
	}

	public record ProblemExampleInput(
			@NotBlank String input,
			@NotBlank String output,
			String explanation,
			int order
	) {
	}

	public record ProblemSolutionInput(
			@NotNull ProgrammingLanguage language,
			@NotBlank String content,
			String explanation
	) {
	}

	public record ProblemUpsertRequest(
			@NotBlank String title,
			@NotBlank String statement,
			@NotNull Difficulty difficulty,
			List<@NotBlank String> tags,
			List<@Valid ProblemExampleInput> examples,
			List<@Valid ProblemSolutionInput> solutions
	) {
	}
}
