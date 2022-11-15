+++
title = "Arvo/Vere Error Handling"
manpower = "TBD"
duration = "TBD"
status = "Future"
lead = "TBD"
description = """
There are a number of cases where Arvo can crash in a way where it gets into an inconsistent state (e.g. Clay does not always handle Ames crashes properly) or gets stuck on something and fails to continue to make progress.
"""
+++

There are a number of cases where Arvo can crash in a way where it gets into an inconsistent state (e.g. Clay does not always handle Ames crashes properly) or gets stuck on something and fails to continue to make progress (e.g. Behn timer expiry events can fail and prevent further timers from running).

A reliable, zero-maintenance Urbit does not have any of these problems.  Each can be individually addressed, but we might also need to rethink the error-handling paradigm to ensure applications are delivered error messages accurately enough.

One proposed design is to track a computation nonce in Arvo that can be used during an error notification event to pinpoint which part of the previous event failed.  Another design would allow applications to register a path of its choosing in the error trace, which Arvo would recognize in the error notification event to route the notification to that application.  Neither design has a written specification yet.
