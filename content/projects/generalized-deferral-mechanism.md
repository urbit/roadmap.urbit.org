+++
title = "Generalized Deferral Mechanism"
duration = "TBD"
manpower = "TBD"
status = "Future"
lead = "TBD"
description = """
Arvo's Behn vane (kernel module) currently serves two purposes: setting timers, and deferring tasks to later events.  Deferral could be split out into a separate feature, which could aid both in refactoring Behn to be easier to verify and optimize.
"""
+++

Arvo's Behn vane (kernel module) currently serves two purposes: setting timers, and deferring tasks to later events.  Deferral could be split out into a separate feature, which could aid both in refactoring Behn to be easier to verify and optimize, as described in the Timer Improvements project, and in enabling a form of parallel Nock execution in the future, whose rough outline is here:
https://gist.github.com/belisarius222/1b79c398ef408d75e849f63df3d2cf18