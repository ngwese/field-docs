---
title: Export
description: Write an edited composition to disk.
sidebar:
  order: 4
---

**File → Export** opens a sheet that encodes the current composition —
regions, edits, channel selection and all — to a new file. The source
recording is never modified.

## What export does

1. Read the composition as planar float, following the edit timeline.
2. Keep the channels you selected.
3. Resample if the destination rate differs.
4. Encode to the path you chose, overwriting any file already there.

Monitor DSP is **not** applied on export. The monitor answers how you listen;
export writes the edit as it is.

## Choose a format

The sheet offers an encoder, a PCM format when the encoder stores PCM, a
sample-rate preset, per-channel checkboxes, a directory, and a filename.

| Encoder | Extension | Notes |
| --- | --- | --- |
| `wav` | `.wav` | Integer and float PCM |
| `flac` | `.flac` | Integer PCM, 1–8 channels |
| `ogg` | `.ogg` | Vorbis; mono is written dual-mono |

Defaults are WAV at the source bit depth, the composition sample rate, and all
channels.

## Profiles

The **Profile** menu is populated from Lua export profiles. Selecting one
resolves settings as source defaults first, then the profile's set fields;
fields the profile omits keep the source value. **Custom** uses source
defaults overlaid with the document's own export preferences.

Choosing a profile and editing the format controls updates the export
variables, which `${…}` path templates can use — for example
`${source.stem}-${sample_rate}-${channel_layout}`.

## Where files go

The location defaults to the source file's directory, named from the source
stem, sample rate, and channel layout. The sheet shows the resolved
destination path so you can confirm it before exporting.

Export is a one-shot encode of the composition. It does not walk session
groups or named regions and does not run a processing chain. For batch work,
scripting can call the same encode through `composition:export` and named
profiles — see the [scripting guide](/field-docs/scripting/).
