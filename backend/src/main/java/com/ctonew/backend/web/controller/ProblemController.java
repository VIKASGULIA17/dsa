package com.ctonew.backend.web.controller;

import com.ctonew.backend.domain.Difficulty;
import com.ctonew.backend.service.ProblemService;
import com.ctonew.backend.web.dto.PageDto;
import com.ctonew.backend.web.dto.ProblemDtos;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {
	private final ProblemService problemService;

	public ProblemController(ProblemService problemService) {
		this.problemService = problemService;
	}

	@GetMapping
	public PageDto<ProblemDtos.ProblemListItemDto> listProblems(
			@RequestParam(required = false) String q,
			@RequestParam(required = false) Difficulty difficulty,
			@RequestParam(required = false) String tag,
			@PageableDefault(size = 20) Pageable pageable
	) {
		Page<ProblemDtos.ProblemListItemDto> page = problemService.listProblems(q, difficulty, tag, pageable);
		return PageDto.from(page);
	}

	@GetMapping("/{id}")
	public ProblemDtos.ProblemDetailDto getProblem(@PathVariable long id) {
		return problemService.getProblem(id);
	}

	@PostMapping
	public ProblemDtos.ProblemDetailDto createProblem(@Valid @RequestBody ProblemDtos.ProblemUpsertRequest request) {
		return problemService.createProblem(request);
	}

	@PutMapping("/{id}")
	public ProblemDtos.ProblemDetailDto updateProblem(@PathVariable long id, @Valid @RequestBody ProblemDtos.ProblemUpsertRequest request) {
		return problemService.updateProblem(id, request);
	}
}
