package com.ctonew.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "problem_example")
public class ProblemExample {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "problem_id", nullable = false)
	private Problem problem;

	@Lob
	@Column(name = "input_text", nullable = false)
	private String inputText;

	@Lob
	@Column(name = "output_text", nullable = false)
	private String outputText;

	@Lob
	@Column(name = "explanation")
	private String explanation;

	@Column(name = "sort_order", nullable = false)
	private int sortOrder;

	protected ProblemExample() {
	}

	public ProblemExample(String inputText, String outputText, String explanation, int sortOrder) {
		this.inputText = inputText;
		this.outputText = outputText;
		this.explanation = explanation;
		this.sortOrder = sortOrder;
	}

	public Long getId() {
		return id;
	}

	public Problem getProblem() {
		return problem;
	}

	void setProblem(Problem problem) {
		this.problem = problem;
	}

	public String getInputText() {
		return inputText;
	}

	public String getOutputText() {
		return outputText;
	}

	public String getExplanation() {
		return explanation;
	}

	public int getSortOrder() {
		return sortOrder;
	}
}
