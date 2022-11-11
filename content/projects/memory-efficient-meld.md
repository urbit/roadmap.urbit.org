+++
title = "Memory-Efficient Meld"
duration = "TBD"
manpower = "TBD"
status = "Future"
lead = "TBD"
+++

The `|meld` command, to deduplicate and defragment memory, can take up to 8GB to run (or maybe more), often eating all available RAM.  For machines that don't have swap space configured, this crashes the process.  A more memory-efficient implementation should reduce this dangerous memory pressure.  This would reduce maintenance burden.
