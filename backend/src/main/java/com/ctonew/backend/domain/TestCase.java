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
@Table(name = "test_case")
public class TestCase {
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
	@Column(name = "expected_output_text", nullable = false)
	private String expectedOutputText;

	@Column(name = "is_sample", nullable = false)
	private boolean sample;

	@Column(name = "sort_order", nullable = false)
	private int sortOrder;

	protected TestCase() {
	}

	public TestCase(String inputText, String expectedOutputText, boolean sample, int sortOrder) {
		this.inputText = inputText;
		this.expectedOutputText = expectedOutputText;
		this.sample = sample;
		this.sortOrder = sortOrder;
	}

	public Long getId() {
		return id;
	}

	public String getInputText() {
		return inputText;
	}

	public String getExpectedOutputText() {
		return expectedOutputText;
	}

	public boolean isSample() {
		return sample;
	}

	public int getSortOrder() {
		return sortOrder;
	}

	void setProblem(Problem problem) {
		this.problem = problem;
	}
}
