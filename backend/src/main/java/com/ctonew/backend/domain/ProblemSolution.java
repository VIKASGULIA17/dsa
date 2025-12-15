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
import jakarta.persistence.Table;

@Entity
@Table(name = "problem_solution")
public class ProblemSolution {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "problem_id", nullable = false)
	private Problem problem;

	@Enumerated(EnumType.STRING)
	@Column(name = "language", nullable = false, length = 20)
	private ProgrammingLanguage language;

	@Lob
	@Column(name = "content", nullable = false)
	private String content;

	@Lob
	@Column(name = "explanation")
	private String explanation;

	protected ProblemSolution() {
	}

	public ProblemSolution(ProgrammingLanguage language, String content, String explanation) {
		this.language = language;
		this.content = content;
		this.explanation = explanation;
	}

	public Long getId() {
		return id;
	}

	public ProgrammingLanguage getLanguage() {
		return language;
	}

	public String getContent() {
		return content;
	}

	public String getExplanation() {
		return explanation;
	}

	void setProblem(Problem problem) {
		this.problem = problem;
	}
}
