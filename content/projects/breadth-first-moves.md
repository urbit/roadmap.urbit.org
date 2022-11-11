+++
title = "Breadth-First Arvo Move Order"
manpower = "1 Engineer"
duration = "2 Months"
lead = "~wicdev-wisryt"
status = "Next Up"
+++

Switching from Arvo's current "depth-first" move order to "breadth-first" intends to improve the reliability of parts of the kernel, including upgrades and breach handling, by switching to chronological ordering of intra-event delivery of moves to vanes.

The first phase of this work has been implemented in a PR.  The second phase is likely to consist of pinning Arvo's scry handler when emitting moves, so that receiving vanes have a referentially transparent view of the Arvo state that preserves the simultaneity of subscription updates.  For example, if at the end of an activation, Jael emits breach notification moves to Ames, Clay, and Gall, each of those vanes will process the incoming move with a scry handler pinned to the Arvo state that includes the result of the Jael activation, but not of the Ames, Clay, or Gall activations.  Moves resulting from the activations of Ames, Clay, and Gall will be received by later vane activations using a scry handler pinned to the Arvo state after running all three vanes, preserving commutativity of those three activations.

- [Ongoing Work](https://github.com/urbit/urbit/pull/6041)
