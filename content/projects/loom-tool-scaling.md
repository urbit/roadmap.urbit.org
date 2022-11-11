+++
title = "Loom Tool Scaling"
status = "Future"
lead = "TBD"
duration = "2-4 Months"
manpower = "1 Engineer"
+++

Once there are 8GB or 16GB in the loom, it will be common for there to be more data in Urbit than fits in RAM.  This presents several new problems:
- demand paging (only load nouns into RAM on an as-needed basis, leaving the rest on disk)
- snapshot management (taking an incremental snapshot is more complex)
- tools, such as `|meld`, `|pack`, garbage collection, and deserializing large portable snapshots, will need to be rewritten to do their bookkeeping differently

Only once these tools can scale up to larger-than-RAM data can the system effectively use more than 16GB of memory, so that is when switching to a 64-bit interpreter might make sense -- managing a large Arvo snapshot means a lot more than just addressing the memory.  By the time the first two phases are complete, New Mars might be ready.  Since New Mars is a 64-bit interpreter, it might make sense not to build a 64-bit version of Vere at all; if New Mars is not yet ready, then a 64-bit Vere would make more sense.
