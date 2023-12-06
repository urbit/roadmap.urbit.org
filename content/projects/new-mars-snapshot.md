+++
title = "Ares: Persistent Memory Arena (PMA)"
arcs = ["Increase Runtime Data Capacity"]
manpower = "1 Engineer"
start_date = "2023-01-01"
end_date = "2023-12-15"
status = "Current"
owner = "~barter-simsum"
spec = "https://github.com/urbit/new-mars/blob/master/docs/persistence.md"
description = """
Ares has a novel scheme for ensuring copy-on-write semantics for memory pages in a way that minimizes disk write amplification when taking an incremental snapshot. 
"""
+++

Ares has a novel scheme for ensuring copy-on-write semantics for memory pages in a way that minimizes disk write amplification when taking an incremental snapshot.  This scheme can be backported to Vere, which is especially important for maintaining performance once the loom (noun memory arena) exceeds the size of RAM, which will happen much more frequently with a 4GB or 8GB loom than it does now.

