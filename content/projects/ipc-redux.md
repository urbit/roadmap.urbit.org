+++
title = "IPC Redux"
date = "2020-07-01"
contributors = ["~master-morzod", "~palfun-foslup", "~wicdev-wisryt", "~pilfer-pandex", "~siprel"]
status = "Completed"
+++

The `urbit` runtime IPC protocol has been significantly rewritten.

The new IPC protocol:

- Avoids head-of-line blocking.
- Includes full error-handling for all events.
- Supports arbitrary reads from the Urbit namespace.

The Vere "king" (i/o & event persistence, the `urbit` binary) and "serf"
(compute & state persistence, the `urbit-worker` binary) have been rewritten to
support and take advantage of the new protocol. New features include:

- Improved event scheduling, with per-source (I/O driver) prioritization.
- A capped queue (currently 1K) for Ames packets.
- The `ncurses`/`terminfo` dependency has been removed.
- Periodic Ames crash reports.
- Arbitrary scries into a ship with the `-X` and `-Y` options.
- Status info with `SIGINFO` (where supported) or `SIGUSR1`.
- Partial-replay and save a "rock" (portable snapshot) with the `-n` option.
- Load state from a "rock" with the `-r` option.

The in-progress Haskell rewrite of the King has been updated to use the new
protocol.

## More info

- [Binary release on Github](https://github.com/urbit/urbit/releases/tag/urbit-v0.10.8)
- [Pull release on Github](https://github.com/urbit/urbit/pull/3064)
