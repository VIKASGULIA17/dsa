package com.ctonew.backend.web.controller;

import com.ctonew.backend.service.ContestService;
import com.ctonew.backend.web.dto.ContestDtos;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/contests")
public class ContestController {
	private final ContestService contestService;

	public ContestController(ContestService contestService) {
		this.contestService = contestService;
	}

	@PostMapping
	public ContestDtos.ContestDto createContest(@Valid @RequestBody ContestDtos.ContestCreateRequest request) {
		return contestService.createContest(request);
	}

	@GetMapping
	public List<ContestDtos.ContestDto> listContests(@RequestParam(required = false) String filter) {
		return contestService.listContests(filter);
	}

	@PostMapping("/{contestId}/registrations")
	public ContestDtos.ContestRegistrationDto register(@PathVariable long contestId) {
		return contestService.registerCurrentUser(contestId);
	}

	@GetMapping("/{contestId}/standings")
	public ContestDtos.StandingsDto getStandings(@PathVariable long contestId) {
		return contestService.getStandings(contestId);
	}
}
