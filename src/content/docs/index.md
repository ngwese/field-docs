---
title: FieldAssist
description: Review, edit, and process audio coming in from the field.
---

FieldAssist is a desktop application for reviewing, editing, and processing
audio recorded in the field. It opens the formats recorders produce, lets you
cut takes down to the parts worth keeping, and exports them in the format you
need for the next stage.

:::caution
FieldAssist is in development and incomplete. The interface, file formats, and
packaging may change between releases.
:::

## Start here

- [Getting started](/field-docs/guide/getting-started/) — install, open a file,
  and play it back.
- [Review editor](/field-docs/guide/review-editor/) — work a take down to the
  parts worth keeping.
- [Sessions](/field-docs/guide/sessions/) — organize media and compositions
  across a recording trip.
- [Export](/field-docs/guide/export/) — write your edits to disk.

## Command line

FieldAssist ships two companion tools for headless work:

- [`field-batch`](/field-docs/cli/field-batch/) — run Lua scripts and a REPL
  without the application.
- [`field-play`](/field-docs/cli/field-play/) — play a composition or a media
  file on the default output device.

## Scripting

FieldAssist, `field-batch`, and `field-play` share one Lua 5.4 API. The
[scripting guide](/field-docs/scripting/) explains how the hosts initialize and
the conventions the API follows; the reference documents each module.

## Supported formats

Audio: WAV, AIFF, CAF, FLAC, OGG, MP3, M4A/MP4, MKV.
Codecs: AAC, ADPCM, ALAC, FLAC, MP1, MP2, MP3, PCM, Vorbis.
Platforms: Linux, macOS, and Windows.
