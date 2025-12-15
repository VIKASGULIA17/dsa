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
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "visualizer_snapshot")
public class VisualizerSnapshot {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "submission_id", nullable = false)
	private Submission submission;

	@Column(name = "snapshot_index", nullable = false)
	private int snapshotIndex;

	@Lob
	@Column(name = "payload", nullable = false)
	private String payload;

	@Column(name = "created_at", nullable = false)
	private Instant createdAt;

	protected VisualizerSnapshot() {
	}

	public VisualizerSnapshot(Submission submission, int snapshotIndex, String payload) {
		this.submission = submission;
		this.snapshotIndex = snapshotIndex;
		this.payload = payload;
	}

	@PrePersist
	void onCreate() {
		createdAt = Instant.now();
	}

	public Long getId() {
		return id;
	}

	public Submission getSubmission() {
		return submission;
	}

	public int getSnapshotIndex() {
		return snapshotIndex;
	}

	public String getPayload() {
		return payload;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}
}
