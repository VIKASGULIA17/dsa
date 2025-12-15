package com.ctonew.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "contest_problem")
public class ContestProblem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "contest_id", nullable = false)
	private Contest contest;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "problem_id", nullable = false)
	private Problem problem;

	@Column(name = "position", nullable = false)
	private int position;

	@Column(name = "points", nullable = false)
	private int points;

	protected ContestProblem() {
	}

	public ContestProblem(Problem problem, int position, int points) {
		this.problem = problem;
		this.position = position;
		this.points = points;
	}

	public Long getId() {
		return id;
	}

	public Contest getContest() {
		return contest;
	}

	void setContest(Contest contest) {
		this.contest = contest;
	}

	public Problem getProblem() {
		return problem;
	}

	public int getPosition() {
		return position;
	}

	public int getPoints() {
		return points;
	}
}
