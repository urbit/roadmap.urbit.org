+++
title = "Arvo Ticks"
arcs = ["Improve Developer Experience"]
start_date = "2023-09-01"
end_date = "2024-04-01"
owner = "~rovnys-ricfer"
status = "Current"
contributors = ["~midden-fabler"]
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0116.md"
description = """
Introduce the concept of an Arvo "tick" -- a number that Arvo tracks that increments every time Arvo runs a vane. This tick can be used in scry paths to request data at the latest available tick.
"""
+++

Introduce the concept of an Arvo "tick" -- a number that Arvo tracks that increments every time Arvo runs a vane. This tick can be used in scry paths to request data at the latest available tick.

This replaces the commonly used pattern of scrying at the current date, which is convenient but violates referential transparency: an agent could scry into another agent at the current date; then poke that agent, changing its state; then scry at the (unchanged) current date again, and receive a different answer. Scrying at the latest tick preserves the convenience of being able to read synchronously from the state of another module (vane or agent), but it ensures referential transparency.

When built in a breadth-first Arvo kernel, this tick system enables a kind of simultaneity that enables notifications, including breach notices, to be delivered to multiple vanes "simultaneously", i.e. it will be unobservable to any code in the system whether any of those vanes were run before other vanes -- this commutativity should also enable a sufficiently smart interpreter to execute these vane activations in parallel.

## Code

- [Pull Request](https://github.com/urbit/urbit/pull/6775)
