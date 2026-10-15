---
title: field-play
description: Play a composition or media file on the default output device.
sidebar:
  order: 2
---

`field-play` loads a FieldAssist composition and plays it through the system
default audio output, without opening the desktop application. Use it to
audition a `.facomp` or a raw media file from the terminal.

## Usage

```
field-play [OPTIONS] <PATH>
```

`<PATH>` is a `.facomp` composition or a media file. A media file is opened as
a single-clip composition with no session.

| Option | Description |
| --- | --- |
| `--stats` | Print playback and pager counters every second, and at exit |
| `--seconds SECONDS` | Stop after this many seconds (default: play to the end) |
| `--start SECONDS` | Seek to this timeline position before playing |
| `--config-dir DIR` | Config directory for `init.lua` (default: the FieldAssist config directory) |
## Examples

Play a composition:

```bash
field-play project.facomp
```

Play a media file:

```bash
field-play take.wav
```

Seek to a start position and stop after a fixed length:

```bash
field-play --start 30 --seconds 10 project.facomp
```

Print counters while playing:

```bash
field-play --stats project.facomp
```

## Monitoring

Startup loads `init.lua` (user config, else the embedded default) and runs
`enrich_composition` then `detect_layout`, so the default monitoring chain
matches what FieldAssist would choose.

When the composition already defines a monitoring chain, that Faust listen
path is kept. If detection leaves the chain unset, Direct is used.

## Keyboard control

On an interactive terminal, `field-play` shows a playhead and accepts
keyboard transport. It also supports markers, notes, and saving from the
terminal. See the [scripting guide](/field-docs/scripting/) for the events and
commands those actions use.
