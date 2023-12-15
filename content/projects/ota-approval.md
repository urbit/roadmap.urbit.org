+++
title = "OTA Approval"
arcs = ["Improve Developer Experience"]
date = "2023-09-20"
owner = "~tinnus-napbus"
status = "Completed"
contributors = ["~tinnus-napbus"]
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0114.md"
description = """
Allow users to selectively enable/disable OTA's on a desk-by-desk basis.
"""
+++

Kiln subscribes to +(let) for the revision number of a desk (a %w care). When it gets the response, it tells Clay to initiate a merge for that revision.

Instead of immediately initiating the merge, it should record the availability of an update in state & ask the user to approve it by sending a a gift out on a subscription path. The user can then approve the update in the front-end which will poke kiln to proceed with the merge.

Kiln should be able to enable global auto-updates, so the user doesn't need to approve if they don't want to. Individual desks should also be able to be set to auto/manual, and this should override global settings.

## Motivation

Currently users have little control over updates and don't know when things have been updated. They can disable updates for a desk, but then don't know if there have been any further updates they might want to install. Users should have more control & be notified when updates are available.


## Code

This will be released to the network in Q1 of 2024 with the 411K release.

- [Pull Request](https://github.com/urbit/urbit/pull/6793)
