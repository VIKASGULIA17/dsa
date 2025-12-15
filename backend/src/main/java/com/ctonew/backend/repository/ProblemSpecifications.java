package com.ctonew.backend.repository;

import com.ctonew.backend.domain.Difficulty;
import com.ctonew.backend.domain.Problem;

import org.springframework.data.jpa.domain.Specification;

public final class ProblemSpecifications {
	private ProblemSpecifications() {
	}

	public static Specification<Problem> titleOrStatementContains(String query) {
		if (query == null || query.isBlank()) {
			return Specification.where(null);
		}
		String like = "%" + query.trim().toLowerCase() + "%";
		return (root, cq, cb) -> cb.or(
				cb.like(cb.lower(root.get("title")), like),
				cb.like(cb.lower(root.get("statement")), like)
		);
	}

	public static Specification<Problem> hasDifficulty(Difficulty difficulty) {
		if (difficulty == null) {
			return Specification.where(null);
		}
		return (root, cq, cb) -> cb.equal(root.get("difficulty"), difficulty);
	}

	public static Specification<Problem> hasTagName(String tagName) {
		if (tagName == null || tagName.isBlank()) {
			return Specification.where(null);
		}
		String normalized = tagName.trim();
		return (root, cq, cb) -> {
			cq.distinct(true);
			var tagJoin = root.join("tags");
			return cb.equal(tagJoin.get("name"), normalized);
		};
	}
}
