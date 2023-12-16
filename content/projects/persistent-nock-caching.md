+++
title = "Persistent Nock Caching"
arcs = ["Make Urbit Fast"]
date = "2023-11-08"
contributors = ["~mastyr-bottec", "~rovnys-ricfer"]
status = "Completed"
description = """
Modifies Hoon's ~+ rune to emit a new variant of the %memo Nock memoization hint that includes a path and is expected to be cached persistently, across multiple Arvo events, by the runtime.
"""
+++

Modifies Hoon's ~+ rune to emit a new variant of the %memo Nock memoization hint that includes a path and is expected to be cached persistently, across multiple Arvo events, by the runtime.

Once this new rune exists, it can replace Arvo's type-check cache for vane activations, Ames performance could be increased by memoizing its packet encoding for re-sends, and Ford could be rewritten as a pure stateless function without caching or dependency tracking. Runtime Nock caches for the Hoon compiler and parser could also be injected during initial boot as a quickboot mechanism.

## Motivation

Urbit runtimes have more information about timing and memory use than Nock code, enabling better caching semantics. Hoon's ~+ rune is useful, but its implementation in runtimes is not persistent beyond the current Arvo event -- in Vere, the cache only lives as long as the current "road" (Nock virtualization level).

Complex caching and deduplication systems have emerged in various parts of Arvo that could be replaced by a persistent memoization cache in the runtime.

The hint for memoization should also include a path to tell the runtime which part of the system is running this code, to enable multiple caches that are tuned differently for different kinds of computations.

## Code

- [Pull Request (Vere)](https://github.com/urbit/vere/pull/508)
- [Pull Request (Ares)](https://github.com/urbit/ares/pull/176)
