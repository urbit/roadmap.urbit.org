+++
title = "Drop Pokes to Dead Agents"
arcs = ["Improve Network Performance", "Improve Security"]
date = "2023-07-18"
status = "Completed"
contributors = ["~dinleb-rambep"]
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0105.md"
description = """
Adds an interface between Ames and Gall that lets Gall tell Ames to drop an incoming %plea packet in case the plea targets an agent that isn't running. The sender will retry every two minutes indefinitely, so if the agent starts running, the %plea will eventually go through, with minimal state on the receiving ship.
"""
+++

Adds an interface between Ames and Gall that lets Gall tell Ames to drop an incoming %plea packet in case the plea targets an agent that isn't running. The sender will retry every two minutes indefinitely, so if the agent starts running, the %plea will eventually go through, with minimal state on the receiving ship.

Without this feature, Gall is reponsible for enqueueing all incoming %pleas, which can use up an unbounded amount of memory.

## Motivation

Some ships have needed to breach because a poorly written Gall agent on another ship repeatedly sent pokes to an agent that wasn't running, either because the agent had not been installed or because it had been installed but then suspended or nuked.

Any unbounded queue that can be manipulated by another ship with impunity is untenable for the Arvo kernel.

## Code

This was released to the network in the 412K release.

- [Pull Request](https://github.com/urbit/urbit/pull/6716)
- [Release](https://github.com/urbit/urbit/releases/tag/412k)
