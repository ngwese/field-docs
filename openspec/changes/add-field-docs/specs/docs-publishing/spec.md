# Spec Delta

## Purpose

The documentation site publishes to GitHub Pages automatically as a
project site from this repository, built from a pinned FieldAssist
revision, and refuses to publish when the build or links are broken.

## ADDED Requirements

### Requirement: Deployment runs on push to the default branch

The repository SHALL build and deploy the site to GitHub Pages when the
default branch is pushed, using GitHub Actions with the Pages source set
to Actions.

#### Scenario: Merge publishes the site

- **GIVEN** a merge to the default branch
- **WHEN** the deploy workflow runs
- **THEN** the site is built and published to the repository's Pages URL
  without manual steps

#### Scenario: Manual republish is available

- **GIVEN** a maintainer who wants to republish without a new commit
- **WHEN** they trigger the workflow manually
- **THEN** the same build and deploy run

### Requirement: Deployment builds from the pinned submodule

The workflow SHALL initialize the FieldAssist submodule at the pinned
revision and apply sparse-checkout before building, so the published
scripting reference matches the pin.

#### Scenario: Published reference matches the pin

- **GIVEN** the submodule pinned at a revision
- **WHEN** the workflow builds and publishes
- **THEN** the scripting pages in the published site come from that
  revision

### Requirement: Base path resolves for a project site

The build SHALL configure `site` and `base` for the project-site location
so generated asset URLs and internal links resolve under the base path.

#### Scenario: Assets resolve under the base path

- **GIVEN** the site published at `https://ngwese.github.io/field-docs/`
- **WHEN** a page is loaded
- **THEN** stylesheets, fonts, and internal links resolve and no
  root-absolute asset request returns 404

### Requirement: Broken builds and links block publishing

The workflow SHALL fail before publishing when type or content checking
fails, when the build fails, or when the built site contains a broken
internal link.

#### Scenario: Broken link blocks the deploy

- **GIVEN** a change that introduces a broken internal link
- **WHEN** the workflow runs
- **THEN** the link check fails and no new version is published
