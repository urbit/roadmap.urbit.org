+++
title = "Add Urth-to-Urth Network Push Sessions"
arcs = ["Improve Network Performance"]
spec = "https://gist.github.com/belisarius222/390daafc146f7c6ddd98836e61dc307f"
manpower = "2 Developers"
duration = "4-6 Months"
status = "Future"
owner = "TBD"
description = """
Solid-state publications that need low latency, such as chat, can't use the remote scry protocol without adding a new protocol to "push" updates to subscribers as soon as they are created.  This protocol is Urth-to-Urth, and opt-in, to ensure naive runtimes still work without it (both as publisher and subscriber).
"""
+++

Solid-state publications that need low latency, such as chat, can't use the remote scry protocol without adding a new protocol to "push" updates to subscribers as soon as they are created.  This protocol is Urth-to-Urth, and opt-in, to ensure naive runtimes still work without it (both as publisher and subscriber).

Adding this protocol is almost purely a runtime change, with maybe a single small addition to Arvo.  The spec assumes remote scry and symmetric routing as dependencies.
