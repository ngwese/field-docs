---
title: Getting started
description: Install FieldAssist, open a file, and play it back.
sidebar:
  order: 1
---

This page covers installing FieldAssist, opening a recording, and playing it
back. Reviewing and editing a take is covered in the
[review editor](/field-docs/guide/review-editor/).

## Install

FieldAssist ships as a platform package. See the
[releases page](https://github.com/ngwese/FieldAssist/releases) for the latest
build.

- **macOS** — open the DMG and drag FieldAssist to Applications. The package is
  self-signed, so the first launch needs **Open Anyway** in
  *System Settings → Privacy & Security*.
- **Windows** — install the MSIX after trusting the bundled certificate.
- **Linux** — install the `.deb`, or unpack the tarball and run `install.sh`.

macOS builds include an **Install CLI Tools** menu item that places the
`field-batch` and `field-play` commands on your `PATH`.

## Open a recording

There are three ways to open audio:

- **File → Open…** and choose a file.
- **Drag and drop** a file onto the window.
- Run `field-play <file>` from the command line.

FieldAssist opens WAV, AIFF, CAF, FLAC, OGG, MP3, M4A/MP4, and MKV files. The
codecs on offer include AAC, ADPCM, ALAC, FLAC, MP1, MP2, MP3, PCM, and
Vorbis.

Opening a recording builds a composition over it: the file stays untouched on
disk and edits are recorded separately.

## Play

Press **Space** to play or pause. The transport sits under the waveform, and
the header shows the playhead position, the sample under the pointer, and the
current selection.

Use the **layout picker** and **Monitor** control in the status bar to choose
how channels are labelled and what monitor processing runs on the listen path.

## Read the status bar

The status bar reports the file's sample rate, bit depth, channel count,
duration, and size. A muted error and warning control sits to its right; select
it to open the Messages tab, which collects script output, warnings, and load
problems.

## If something goes wrong on open

When a file cannot be fully probed or a referenced file is missing, FieldAssist
collects everything into a single load-problems sheet, grouped by category.
Selecting **OK** dismisses the sheet and cancels the open, so you can fix the
source and try again.
