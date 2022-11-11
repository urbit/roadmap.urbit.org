+++
title = "LMDB"
date = "2019-04-24"
contributors = ["~littel-ponnys"]
status = "Completed"
description = """
A migration to a lightning memory-mapped database for the event log.
"""
+++

Urbit has so-far used a hand-rolled system to record events in a ship's [event
log](https://urbit.org/docs/glossary/eventlog). This code has been complex,
error-prone and difficult to maintain. To address this, the Urbit runtime has
switched to using an
[LMDB](https://en.wikipedia.org/wiki/Lightning_Memory-Mapped_Database) database
for the event log. LMDB is very fast and very mature, providing a reliable way
to record events and greatly simplifying the codebase of the runtime.

## More info

- [Pull request on Github](https://github.com/urbit/urbit/pull/1248)
- [Wikipedia article about LMDB](https://en.wikipedia.org/wiki/Lightning_Memory-Mapped_Database)
