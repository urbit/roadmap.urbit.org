+++
title = "Loom Tool Scaling"
arcs = ["Increase Runtime Data Capacity"]
status = "Future"
owner = "TBD"
duration = "2-4 Months"
manpower = "1 Engineer"
description = """
Once there are 8GB or 16GB in the loom, it will be common for there to be more data in Urbit than fits in RAM.  This presents several new problems, and demands solutions.
"""
+++

Once there are 8GB or 16GB in the loom, it will be common for there to be more data in Urbit than fits in RAM.  This presents several new problems:
- demand paging (only load nouns into RAM on an as-needed basis, leaving the rest on disk)
- snapshot management (taking an incremental snapshot is more complex)
- tools, such as `|meld`, `|pack`, garbage collection, and deserializing large portable snapshots, will need to be rewritten to do their bookkeeping differently

[Omitted long matching line]
