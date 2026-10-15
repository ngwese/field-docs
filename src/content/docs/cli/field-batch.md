---
title: field-batch
description: Run Lua scripts headlessly, or open an interactive REPL.
sidebar:
  order: 1
---

`field-batch` runs Lua against the shared `field.*` scripting host without the
desktop application. Use it for scripted pipelines, quick experiments, and
Unix shebang scripts.

## Usage

```
field-batch [OPTIONS] [SCRIPT] [ARGS]...
```

With no `SCRIPT`, `field-batch` opens an interactive REPL. With a script
path, it runs that file; `ARGS` are forwarded to the script as `app.args`.

| Option | Description |
| --- | --- |
| `--config-dir DIR` | Config directory for `field.include` and `init.lua` (default: the FieldAssist config directory) |
| `--eval EXPR` | Evaluate a single expression and exit, for testing and non-interactive use |

## Examples

Open the REPL:

```bash
field-batch
```

Run a script:

```bash
field-batch transcode-to-staging.lua
```

Pass arguments, available to the script as `app.args`:

```bash
field-batch script.lua input.flac output.flac
```

Evaluate one expression:

```bash
field-batch --eval 'return app.name'
```

## Shebang scripts

On Unix, a script can name `field-batch` as its interpreter:

```bash
#!/usr/bin/env field-batch
```

Mark the file executable and run it directly. The script path is available to
the running script.

## Startup

`field-batch` loads `settings.json` from the config directory, applies the
scripting settings, loads `variables.json` if present, and then loads
`init.lua` — the user file if present, otherwise the embedded default. It does
**not** load the application's Add, Replace, or Review workflow bundles.

The default config directory is shared with FieldAssist, so scripts see the
same search paths and modules. Override it with `--config-dir`.
