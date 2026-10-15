# Agent Guidelines

## Commits

This repository uses [Conventional Commits](https://www.conventionalcommits.org/).

Write commit messages in the imperative mood, for example:

- `docs: add stereo waveform lane spec`
- `chore: track OpenSpec agent skills for omp`

Hard-wrap every line of the commit message — subject and body — to 80
characters or fewer. Do not leave the body as a single unwrapped paragraph.

A commit message describes only what the commit contains: the change in the
diff. Never mention OpenSpec task numbers (e.g. `5.3`), task or spec
completion status or counts (e.g. `21/22 tasks`, "completes the change"),
progress narration, or blockers. That is workflow state from the working
session, not commit content.

## Repository

This repository holds OpenSpec specifications and change proposals, plus the
agent skills and commands used to drive them. It contains no application code.
Specs live in `openspec/specs/`; active changes live in `openspec/changes/`;
completed changes are archived under `openspec/changes/archive/`.

Project constraints that guide OpenSpec artifacts belong in
`openspec/config.yaml`. Keep general documentation and codebase facts out of
it.

## Binary assets (Git LFS)

Screenshots, diagrams, audio, and video used by the site are stored with
[Git LFS](https://git-lfs.com/). Patterns are declared in `.gitattributes`;
add new extensions there rather than committing binaries directly. Run
`git lfs install` once per clone so the filters are active. Never stage a
binary with LFS disabled and then switch — that history is hard to fix.

## Before committing

1. Review `git status` and confirm no stray artifacts (e.g. local tooling
   output, editor scratch files) are staged.
2. Ensure spec and change Markdown is well-formed and internal links resolve.
