# Spec Delta

## Purpose

A static documentation site built with Astro and Starlight renders an
authored user guide and CLI reference alongside the FieldAssist scripting
guide and per-module reference, with a single token stylesheet shared by
all pages.

## ADDED Requirements

### Requirement: Site renders as static pages

The site SHALL build to fully static output with Astro and the Starlight
integration, and the build SHALL complete with no errors.

#### Scenario: Clean static build

- **GIVEN** a checkout with the submodule initialized and dependencies
  installed
- **WHEN** the site is built
- **THEN** the build completes without errors and emits pre-rendered
  static pages for every route

#### Scenario: No server runtime

- **GIVEN** the built output
- **WHEN** the pages are served by a static file host
- **THEN** every route renders without a request-scoped server runtime

### Requirement: Content collection with validated frontmatter

Authored pages SHALL live in a Starlight content collection under
`src/content/docs/`, and each page SHALL carry frontmatter validated by a
schema, including a title and, where used, a description and sidebar
order.

#### Scenario: Missing title fails validation

- **GIVEN** a page in the content collection with no title in its
  frontmatter
- **WHEN** the content is validated
- **THEN** validation fails and names the offending page

#### Scenario: Navigation reflects sidebar order

- **GIVEN** a section whose pages declare sidebar order
- **WHEN** the site is built
- **THEN** the navigation lists those pages in the declared order

### Requirement: Scripting content synced from the submodule

The scripting guide and per-module reference SHALL be sourced from the
FieldAssist repository through a git submodule, and SHALL be synced into
the content collection before build and dev so that each module is its
own page.

#### Scenario: Guide and module pages render

- **GIVEN** the submodule is initialized and sparse-checked out to
  `docs/scripting`
- **WHEN** the sync step runs and the site is built
- **THEN** the scripting guide renders as a section page and each
  `field.*` module has its own reachable page

#### Scenario: Module page carries a title

- **GIVEN** a synced reference page for a module
- **WHEN** the page renders
- **THEN** it has a page title derived from the module and appears in
  the scripting navigation

### Requirement: Theming through a single token stylesheet

Colors, type, spacing, and radii SHALL be declared once in a token
stylesheet consumed by Starlight, so a future landing page can reuse the
same tokens.

#### Scenario: Token change propagates

- **GIVEN** a value changed in the token stylesheet
- **WHEN** the site is built
- **THEN** the change is reflected across pages without editing
  Starlight component styles

### Requirement: Accessibility is a build-level concern

Pages SHALL be keyboard navigable and images SHALL carry alt text.

#### Scenario: Images have alt text

- **GIVEN** a page that references an image
- **WHEN** the page is reviewed
- **THEN** the image has non-empty alternative text or is marked
  decorative

#### Scenario: Landmarks are reachable

- **GIVEN** any rendered page
- **WHEN** it is navigated by keyboard
- **THEN** the primary content is reachable and a skip link is available
