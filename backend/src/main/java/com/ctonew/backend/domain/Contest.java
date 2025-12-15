package com.ctonew.backend.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "contest")
public class Contest extends AuditableEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", nullable = false, length = 200)
	private String title;

	@Lob
	@Column(name = "description")
	private String description;

	@Column(name = "start_time", nullable = false)
	private Instant startTime;

	@Column(name = "end_time", nullable = false)
	private Instant endTime;

	@OneToMany(mappedBy = "contest", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("position ASC")
	private Set<ContestProblem> problems = new LinkedHashSet<>();

	protected Contest() {
	}

	public Contest(String title, String description, Instant startTime, Instant endTime) {
		this.title = title;
		this.description = description;
		this.startTime = startTime;
		this.endTime = endTime;
	}

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public Instant getStartTime() {
		return startTime;
	}

	public Instant getEndTime() {
		return endTime;
	}

	public Set<ContestProblem> getProblems() {
		return problems;
	}

	public void clearProblems() {
		problems.clear();
	}

	public void addProblem(ContestProblem contestProblem) {
		contestProblem.setContest(this);
		problems.add(contestProblem);
	}
}
