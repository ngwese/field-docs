---
title: Review editor
description: Work a take down to the parts worth keeping.
sidebar:
  order: 2
---

The review editor is the center of FieldAssist: a waveform over the recording,
a transport under it, and panels for markers, regions, and edits. Edits are
non-destructive — the source file is never rewritten.

## Read the waveform

Each channel is a lane, labelled from the current layout. The scale gutter on
the left labels peaks panes in dBFS and spectrum panes in log Hz.

- **Zoom** with the view commands or the zoom keys; at high zoom the waveform
  reads PCM directly for sample accuracy.
- **Pan** by dragging, with the scrollbar, or with Shift+wheel.
- **Follow Playhead** (View menu, on by default) keeps the playhead centered
  during playback whenever the view does not already show the whole buffer.
  Turn it off to pan freely while playing.

## Select

Click and drag to set the session selection. Additional gestures:

| Gesture | Effect |
| --- | --- |
| Drag | Replace the selection |
| Cmd/Ctrl-drag | Add a disjoint region |
| Shift-drag or Shift-click | Extend the nearest endpoint |
| Alt-drag | Scope the gesture to one lane's channel |

A click without a drag sets the caret. Channel headers support multi-select:
click replaces, Shift-click extends a range, and Cmd/Ctrl-click toggles.

Two snap modes help place edges precisely. **Zero-crossing snap** is on by
default; **snap to marker** is off by default. When both are on, marker snap
wins inside its latch radius.

## Mark

Markers are typed instants with an optional note. Built-in types are Blue,
Yellow, Purple, Transient, and Note; you can define custom types with their
own name and color. At most one marker of a type may occupy a frame.

- **Add Marker** places one at the caret, or at the pointer when **Add at
  Hover** is on.
- **Quick note** opens a small field; Return commits a Note marker at the
  target, and Escape cancels without creating one.
- The Markers panel lists markers and can jump the cursor to one.

## Edit

Timeline edits apply to every region in the current selection and are recorded
on the composition so they can be undone and redone.

| Command | Effect |
| --- | --- |
| Cut | Copy, then remove (the timeline shrinks) |
| Copy | Copy clip-tree slices |
| Paste | At the caret, or replace the first selected span |
| Clear | Replace with silence of the same length |
| Remove | Close the gap |
| Duplicate | Insert a copy after the range |
| Trim | Keep selected spans concatenated; discard the rest |

`Cut`, `Copy`, `Paste`, `Clear`, `Remove`, `Duplicate`, and `Trim` all work on
the selection. The Edits panel lists each step and can jump the cursor to it.

## Break out compositions

Two commands create child compositions from a parent's selection, so a take
can spawn focused pieces without duplicating media:

- **Compositions from Selection** — each selected span becomes a named
  full-channel child.
- **Composition from Channels** — one child using the selected channel
  headers, optionally trimmed to the time selection.

Both are on the waveform context menu, enabled when the relevant selection
exists. Child compositions share the parent's media and appear nested in the
[explorer](/field-docs/guide/sessions/) while the parent is open.

## Regions

Named region collections persist on the composition. The Regions panel can
adopt a named collection into the selection, which is what the edit commands
and export act on.
