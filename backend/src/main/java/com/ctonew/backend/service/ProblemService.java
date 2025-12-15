package com.ctonew.backend.service;

import com.ctonew.backend.domain.Difficulty;
import com.ctonew.backend.domain.Problem;
import com.ctonew.backend.domain.ProblemExample;
import com.ctonew.backend.domain.ProblemSolution;
import com.ctonew.backend.domain.ProblemTag;
import com.ctonew.backend.repository.ProblemRepository;
import com.ctonew.backend.repository.ProblemSpecifications;
import com.ctonew.backend.repository.ProblemTagRepository;
import com.ctonew.backend.web.dto.ProblemDtos;
import com.ctonew.backend.web.exception.NotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

@Service
public class ProblemService {
    private final ProblemRepository problemRepository;
    private final ProblemTagRepository tagRepository;

    public ProblemService(ProblemRepository problemRepository, ProblemTagRepository tagRepository) {
        this.problemRepository = problemRepository;
        this.tagRepository = tagRepository;
    }

    @Transactional(readOnly = true)
    public Page<ProblemDtos.ProblemListItemDto> listProblems(String q, Difficulty difficulty, String tag, Pageable pageable) {
        Specification<Problem> spec = Specification.where(ProblemSpecifications.titleOrStatementContains(q))
                .and(ProblemSpecifications.hasDifficulty(difficulty))
                .and(ProblemSpecifications.hasTagName(tag));

        return problemRepository.findAll(spec, pageable).map(this::toListItemDto);
    }

    @Transactional(readOnly = true)
    public ProblemDtos.ProblemDetailDto getProblem(long id) {
        Problem problem = problemRepository.findWithDetailsById(id)
                .orElseThrow(() -> new NotFoundException("Problem not found"));
        return toDetailDto(problem);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public ProblemDtos.ProblemDetailDto createProblem(ProblemDtos.ProblemUpsertRequest request) {
        Problem problem = new Problem(request.title(), request.statement(), request.difficulty());
        applyUpsert(problem, request);
        Problem saved = problemRepository.save(problem);
        return toDetailDto(saved);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public ProblemDtos.ProblemDetailDto updateProblem(long id, ProblemDtos.ProblemUpsertRequest request) {
        Problem problem = problemRepository.findWithDetailsById(id)
                .orElseThrow(() -> new NotFoundException("Problem not found"));
        problem.setTitle(request.title());
        problem.setStatement(request.statement());
        problem.setDifficulty(request.difficulty());

        applyUpsert(problem, request);
        return toDetailDto(problem);
    }

    private void applyUpsert(Problem problem, ProblemDtos.ProblemUpsertRequest request) {
        Set<ProblemTag> tags = resolveTags(request.tags());
        problem.getTags().clear();
        problem.getTags().addAll(tags);

        problem.clearExamples();
        if (request.examples() != null) {
            for (ProblemDtos.ProblemExampleInput e : request.examples()) {
                problem.addExample(new ProblemExample(e.input(), e.output(), e.explanation(), e.order()));
            }
        }

        problem.clearSolutions();
        if (request.solutions() != null) {
            for (ProblemDtos.ProblemSolutionInput s : request.solutions()) {
                problem.addSolution(new ProblemSolution(s.language(), s.content(), s.explanation()));
            }
        }
    }

    private Set<ProblemTag> resolveTags(List<String> names) {
        if (names == null || names.isEmpty()) {
            return Set.of();
        }
        List<String> normalized = names.stream()
                .filter(n -> n != null && !n.isBlank())
                .map(n -> n.trim().toLowerCase(Locale.ROOT))
                .distinct()
                .toList();

        List<ProblemTag> existing = tagRepository.findByNameIn(normalized);
        Map<String, ProblemTag> byName = new HashMap<>();
        for (ProblemTag tag : existing) {
            byName.put(tag.getName(), tag);
        }

        List<ProblemTag> toCreate = new ArrayList<>();
        for (String name : normalized) {
            if (!byName.containsKey(name)) {
                ProblemTag t = new ProblemTag(name);
                toCreate.add(t);
                byName.put(name, t);
            }
        }
        if (!toCreate.isEmpty()) {
            tagRepository.saveAll(toCreate);
        }

        Set<ProblemTag> resolved = new LinkedHashSet<>();
        for (String name : normalized) {
            resolved.add(byName.get(name));
        }
        return resolved;
    }

    private ProblemDtos.ProblemListItemDto toListItemDto(Problem p) {
        List<String> tags = p.getTags().stream().map(ProblemTag::getName).sorted().toList();
        return new ProblemDtos.ProblemListItemDto(p.getId(), p.getTitle(), p.getDifficulty(), tags);
    }

    private ProblemDtos.ProblemDetailDto toDetailDto(Problem p) {
        List<String> tags = p.getTags().stream().map(ProblemTag::getName).sorted().toList();
        List<ProblemDtos.ProblemExampleDto> examples = p.getExamples().stream()
                .map(e -> new ProblemDtos.ProblemExampleDto(e.getInputText(), e.getOutputText(), e.getExplanation(), e.getSortOrder()))
                .toList();
        List<ProblemDtos.ProblemSolutionDto> solutions = p.getSolutions().stream()
                .map(s -> new ProblemDtos.ProblemSolutionDto(s.getLanguage(), s.getContent(), s.getExplanation()))
                .toList();
        return new ProblemDtos.ProblemDetailDto(p.getId(), p.getTitle(), p.getStatement(), p.getDifficulty(), tags, examples, solutions);
    }
}
