+++
title = "Ares: Persistent Memory Arena (PMA)"
arcs = ["Make Urbit Fast", "Increase Capability"]
manpower = "1 Developer"
start_date = "2023-01-01"
end_date = "2023-12-15"
status = "Current"
owner = "~barter-simsum"
contributors = ["~ritpub-sipsyl", "~barter-simsum"]
spec = "https://github.com/urbit/new-mars/blob/master/docs/persistence.md"
description = """
Ares has a novel scheme for ensuring copy-on-write semantics for memory pages in a way that minimizes disk write amplification when taking an incremental snapshot. 
"""
+++

Ares has a novel scheme for ensuring copy-on-write semantics for memory pages in a way that minimizes disk write amplification when taking an incremental snapshot.  This is used to implement a storage system that can efficiently manage up to 16 terabytes of data in a single Urbit ship.

The work can be tracked here:

- [PR](https://github.com/urbit/ares/pull/143)
