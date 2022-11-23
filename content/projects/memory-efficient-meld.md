+++
title = "Memory-Efficient Meld"
arcs = ["Increase Runtime Data Capacity", "Reduce Hosting Costs"]
duration = "1-2 Months"
manpower = "1 Engineer"
status = "Next Up"
lead = "TBD"
description = """
A more memory-efficient implementation of `|meld` should reduce dangerous memory pressure.  This would reduce maintenance burden.
"""
+++

The `|meld` command, to deduplicate and defragment memory, can take up to 8GB to run (or maybe more), often eating all available RAM.  For machines that don't have swap space configured, this crashes the process.  A more memory-efficient implementation should reduce this dangerous memory pressure.  This would reduce maintenance burden.

For many users, `|meld` is unusable, since they don't have swap space set up on the machine they use to run their ships and it can use enough memory to kill the Urbit process.  For users whose looms are almost full, this issue can prevent them from running their ships at all, so fixing it is an important step toward Zero-click maintenance.
