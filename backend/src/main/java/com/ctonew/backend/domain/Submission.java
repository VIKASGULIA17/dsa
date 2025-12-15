package com.ctonew.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "submission")
public class Submission {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_id", nullable = false, length = 120)
	private String userId;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "problem_id", nullable = false)
	private Problem problem;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "contest_id")
	private Contest contest;

	@Enumerated(EnumType.STRING)
	@Column(name = "language", nullable = false, length = 20)
	private ProgrammingLanguage language;

	@Lob
	@Column(name = "code", nullable = false)
	private String code;

	@Enumerated(EnumType.STRING)
	@Column(name = "verdict", nullable = false, length = 20)
	private Verdict verdict;

	@Column(name = "score")
	private Integer score;

	@Column(name = "created_at", nullable = false)
	private Instant createdAt;

	protected Submission() {
	}

	public Submission(String userId, Problem problem, Contest contest, ProgrammingLanguage language, String code) {
		this.userId = userId;
		this.problem = problem;
		this.contest = contest;
		this.language = language;
		this.code = code;
		this.verdict = Verdict.PENDING;
	}

	@PrePersist
	void onCreate() {
		createdAt = Instant.now();
	}

	public Long getId() {
		return id;
	}

	public String getUserId() {
		return userId;
	}

	public Problem getProblem() {
		return problem;
	}

	public Contest getContest() {
		return contest;
	}

	public ProgrammingLanguage getLanguage() {
		return language;
	}

	public String getCode() {
		return code;
	}

	public Verdict getVerdict() {
		return verdict;
	}

	public Integer getScore() {
		return score;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setVerdict(Verdict verdict) {
		this.verdict = verdict;
	}

	public void setScore(Integer score) {
		this.score = score;
	}
}
