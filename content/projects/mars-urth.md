+++
title = "Mars/Urth Split"
arcs = ["Zero-click Maintenance"]
start_date = "2021-01-21"
owner = "~master-morzod"
status = "Future"
description = """
Move event log management into the same Unix process that manages
snapshots.
"""
+++

This project moves the event log into the worker process (along with the boot process and event replay), thereby redefining the roles (and IPC) in Urbit's multiprocess architecture (from "king" and "serf" to "urth" and "mars"). This work is a prerequisite for online event log truncation and a variety of improvements to the replay process (both to be realized by collocating the event log and snapshot management).

As of mid-February 2023, this work has a bug that must be fixed before release.

- [PR for Mars/Urth Split](https://github.com/urbit/urbit/pull/5596)
- [Related PR for the Epoch System](https://github.com/urbit/urbit/pull/5701)
