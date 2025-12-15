package com.ctonew.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "contest_registration")
public class ContestRegistration {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "contest_id", nullable = false)
	private Contest contest;

	@Column(name = "user_id", nullable = false, length = 120)
	private String userId;

	@Column(name = "registered_at", nullable = false)
	private Instant registeredAt;

	protected ContestRegistration() {
	}

	public ContestRegistration(Contest contest, String userId) {
		this.contest = contest;
		this.userId = userId;
	}

	@PrePersist
	void onCreate() {
		registeredAt = Instant.now();
	}

	public Long getId() {
		return id;
	}

	public Contest getContest() {
		return contest;
	}

	public String getUserId() {
		return userId;
	}

	public Instant getRegisteredAt() {
		return registeredAt;
	}
}
