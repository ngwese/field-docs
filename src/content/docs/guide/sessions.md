---
title: Sessions
description: Organize media and compositions across a recording trip.
sidebar:
  order: 3
---

A session is the working set you have open: the recordings you are reviewing
and the compositions you have made from them. It is saved as a `.fasession`
file.

There is always one active session. It starts empty and untitled.

## What a session holds

- The documents you have open, each with its own id and optional group.
- The media the session references, so relative paths resolve when the project
  tree moves between machines.
- Named groups that become sections in the explorer.
- String properties and, optionally, a bound workflow.

A session does **not** store the audio itself. Source files stay where they
are; the session stores references and your edits.

## Open and close

- **File → Open…** a `.fasession` replaces the active session, after any
  unsaved compositions are handled.
- **File → Close Session** prompts for unsaved work, then replaces the window
  with a new empty session and an empty media pool.

Opening a session is a single operation: if any referenced media is missing or
fails to probe, everything is collected into one load-problems sheet rather
than interrupting you file by file. Selecting **OK** dismisses the sheet and
cancels the open.

## The explorer

The explorer lists every document in the session. Ungrouped documents appear
under **session**; your named groups become sections in the order you set,
including empty ones.

From the explorer you can:

- Activate a document, or open it as a pinned tab.
- Close a document, or close just its tab (the document stays in the session).
- Rename a document in place with Shift+Return.
- Regroup or reorder documents by dragging, including between sections.
- Rename, add, delete, or drag-reorder group headers.

Modified compositions are marked. A document that is a child of an open
parent is shown nested, with a link icon; click the icon to select the parent.

## Tabs

A newly opened document is a transient, unpinned tab. Opening another file can
replace it. **Pin** the tab to keep it, or use the explorer's open-tab action,
which pins as it opens.

## Save

- **File → Save** and **Save As** write compositions.
- **File → Save Session** and **Save Session As** write the `.fasession`.

Compositions prompt to save when their edit cursor, markers, region
collections, or display title differ from the last save. Changing a channel
layout, monitor chain, or playback subset alone does not mark a composition
modified.

An untitled session does not prompt for changes to its membership; a session
prompts only when it is dirty and already has a path.

Saving resolves document paths relative to the session file when it can, so a
project tree can move intact.
