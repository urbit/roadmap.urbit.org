+++
title = "Event Log Truncation"
arcs = ["Reduce Hosting Costs"]
start_date = "2021-01-21"
end_date = "2023-2-15"
owner = "~mastyr-bottec"
status = "Completed"
description = """
The event log grows indefinitely, using more disk space over time. Once event logs can be truncated, disk space can be reclaimed, using a roughly constant amount of disk space over time (the size of the Arvo snapshot, which grows much more slowly than the event log). Reducing disk space in this way is important for reducing cost and maintenance burden for running ships.
"""
+++

The event log grows indefinitely, using more disk space over time. Once event logs can be truncated, disk space can be reclaimed, using a roughly constant amount of disk space over time (the size of the Arvo snapshot, which grows much more slowly than the event log). Reducing disk space in this way is important for reducing cost and maintenance burden for running ships.

There are a few levels of event log truncation:

- manual rollover, manual truncation
- automated rollover, manual truncation
- automated rollover, automated truncation

The first, fully manual, version of event log truncation is being written by `~mastyr-bottec`, has been merged into the `develop` branch, and should be released soon.  A more future-proof implementation, written on top of the Mars/Urth split and the epoch system, has been written by `~fanfun-mocbud` and `~master-morzod` and will be released once the Mars/Urth has been thoroughly tested. Automated truncation will come later.

- [PR for "chop" basic truncation](https://github.com/urbit/vere/pull/165)
- [PR for epoch system](https://github.com/urbit/urbit/pull/5701)
