+++
title = "Event Log Truncation"
arcs = ["Reduce Hosting Costs"]
start_date = "2021-01-01"
end_date = "2022-12-15"
lead = "~fanfun-mocbud"
status = "Current"
description = """
The event log grows indefinitely, using more disk space over time. Once event logs can be truncated, disk space can be reclaimed, using a roughly constant amount of disk space over time (the size of the Arvo snapshot, which grows much more slowly than the event log). Reducing disk space in this way is important for reducing cost and maintenance burden for running ships.
"""
+++

The event log grows indefinitely, using more disk space over time. Once event logs can be truncated, disk space can be reclaimed, using a roughly constant amount of disk space over time (the size of the Arvo snapshot, which grows much more slowly than the event log). Reducing disk space in this way is important for reducing cost and maintenance burden for running ships.

There are a few levels of event log truncation:

- manual rollover, manual truncation
- automated rollover, manual truncation
- automated rollover, automated truncation

The first, fully manual, version of event log truncation is being polished by `~fanfun-mocbud` and `~master-morzod` and should be released soon. Automation will come later.

- [PR](https://github.com/urbit/urbit/pull/5701)
