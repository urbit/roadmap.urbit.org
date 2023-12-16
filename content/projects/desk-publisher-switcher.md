+++
title = "Desk Publisher Switching"
arcs = ["Improve Developer Experience"]
date = "2023-09-29"
owner = "~tinnus-napbus"
status = "Completed"
contributors = ["~tinnus-napbus"]
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0111.md"
description = """
Allows app publishers to more easily migrate distribution ships.
"""
+++

Allows app publishers to send a poke to all those subscribed for desk updates requesting they change the source of updates to a new ship/desk. Such requests are recorded in kiln's state, and the recipients can then approve or reject them. Upon approval, all existing syncs from the the old ship/desk will be changed to sync from the new ship/desk. This allows app publishers to more easily migrate the distribution ship.

## Motivation

If you're currently distributing an app from ship A and want to change to ship B, you have to try and tell everyone to manually switch. Alternatively, you can push an update to your app that pokes kiln to perform this action in ++on-load. Both are inconvenient for the app publisher.

For example, the Foundation wants to consolidate app distribution to a star from the multiple ships that Foundation-developed apps are currently distributed from. Or, an app developer started off distributing apps from their personal ship or moon but want to switch to a star.  

## Code

This will be released to the network in Q1 of 2024 with the 411K release.

- [Pull Request](https://github.com/urbit/urbit/pull/6780)
