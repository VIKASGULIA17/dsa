package com.ctonew.backend.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "problem")
public class Problem extends AuditableEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", nullable = false, length = 200)
	private String title;

	@Lob
	@Column(name = "statement", nullable = false)
	private String statement;

	@Enumerated(EnumType.STRING)
	@Column(name = "difficulty", nullable = false, length = 20)
	private Difficulty difficulty;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name = "problem_tag_link",
			joinColumns = @JoinColumn(name = "problem_id"),
			inverseJoinColumns = @JoinColumn(name = "tag_id")
	)
	private Set<ProblemTag> tags = new LinkedHashSet<>();

	@OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("sortOrder ASC, id ASC")
	private Set<ProblemExample> examples = new LinkedHashSet<>();

	@OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("id ASC")
	private Set<ProblemSolution> solutions = new LinkedHashSet<>();

	@OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("sortOrder ASC, id ASC")
	private Set<TestCase> testCases = new LinkedHashSet<>();

	protected Problem() {
	}

	public Problem(String title, String statement, Difficulty difficulty) {
		this.title = title;
		this.statement = statement;
		this.difficulty = difficulty;
	}

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStatement() {
		return statement;
	}

	public void setStatement(String statement) {
		this.statement = statement;
	}

	public Difficulty getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(Difficulty difficulty) {
		this.difficulty = difficulty;
	}

	public Set<ProblemTag> getTags() {
		return tags;
	}

	public Set<ProblemExample> getExamples() {
		return examples;
	}

	public Set<ProblemSolution> getSolutions() {
		return solutions;
	}

	public Set<TestCase> getTestCases() {
		return testCases;
	}

	public void clearExamples() {
		examples.clear();
	}

	public void addExample(ProblemExample example) {
		example.setProblem(this);
		examples.add(example);
	}

	public void clearSolutions() {
		solutions.clear();
	}

	public void addSolution(ProblemSolution solution) {
		solution.setProblem(this);
		solutions.add(solution);
	}
}
