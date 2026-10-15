# Spec Delta

## Purpose

A reader can find and follow task-oriented documentation for using
FieldAssist, its session and export model, and its companion command-line
tools, alongside the scripting reference.

## ADDED Requirements

### Requirement: Getting started is documented

The site SHALL document installing and first launching FieldAssist,
opening a media file or composition, and basic playback.

#### Scenario: A new user can play a file

- **GIVEN** a reader who has installed the application
- **WHEN** they follow the getting-started page
- **THEN** they can open a file and start playback without consulting
  another source

### Requirement: Review editing is documented

The site SHALL document the review editor: navigating a waveform,
creating and editing regions, and working with markers.

#### Scenario: Region workflow is covered

- **GIVEN** a reader reviewing a take
- **WHEN** they read the review editor page
- **THEN** selecting, trimming, naming, and grouping regions is
  explained

### Requirement: Sessions are documented

The site SHALL document what a session contains, how to open and save
one, and how media and compositions are organized within it.

#### Scenario: Session lifecycle is covered

- **GIVEN** a reader organizing work across takes
- **WHEN** they read the sessions page
- **THEN** creating, opening, and saving a session and its documents is
  explained

### Requirement: Export is documented

The site SHALL document exporting compositions, including choosing an
output format and where exported files are written.

#### Scenario: Export choices are covered

- **GIVEN** a reader with an edited composition
- **WHEN** they read the export page
- **THEN** the available output formats and the destination behavior are
  explained

### Requirement: CLI tools are documented

The site SHALL document `field-batch` and `field-play` usage, arguments,
and runnable examples.

#### Scenario: field-batch usage is covered

- **GIVEN** a reader wanting to run Lua headlessly
- **WHEN** they open the `field-batch` page
- **THEN** REPL use, running a script file, passing arguments, and the
  shebang form are shown with examples

#### Scenario: field-play usage is covered

- **GIVEN** a reader wanting to play a composition
- **WHEN** they open the `field-play` page
- **THEN** playing a `.facomp` or a media file and the relevant options
  are shown with examples

### Requirement: The scripting section introduces the reference

The site SHALL present the scripting guide as the introduction to the
module reference, explaining host scope and initialization before a
reader looks up a module.

#### Scenario: Guide precedes reference

- **GIVEN** a reader opening the scripting section
- **WHEN** they follow the section navigation
- **THEN** the guide is reachable and precedes the per-module pages
