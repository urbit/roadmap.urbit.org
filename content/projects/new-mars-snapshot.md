+++
title = "New Mars Snapshot Design"
arcs = ["Increase Runtime Data Capacity"]
manpower = "1 Engineer"
duration = "2 Months"
status = "Future"
owner = "TBD"
description = """
New Mars has a novel scheme for ensuring copy-on-write semantics for memory pages in a way that minimizes disk write amplification when taking an incremental snapshot. 
"""
+++

New Mars has a novel scheme for ensuring copy-on-write semantics for memory pages in a way that minimizes disk write amplification when taking an incremental snapshot.  This scheme can be backported to Vere, which is especially important for maintaining performance once the loom (noun memory arena) exceeds the size of RAM, which will happen much more frequently with a 4GB or 8GB loom than it does now.
