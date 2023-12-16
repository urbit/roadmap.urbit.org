+++
title = "Encrypted Remote Scry"
arcs = ["Increase Capability"]
date = "2023-12-15"
status = "Completed"
owner = "~hastuc-dibtux"
contributors = ["~hastuc-dibtux"]
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0118.md"
description = """
Arvo needs to encrypt scry paths and the values bound to them in order to use the remote scry protocol for private data such as group chats.
"""
+++

Encrypted remote scry enables private data using the remote scry protocol (Fine) by making scry requests for paths that are encrypted, so that private data can be made available using the remote scry protocol.

## Motivation

The basic Fine implementation does not support encryption. This prevents it from being used for a significant number of use cases, including gall subscriptions.

## Code

This work is completed and will release to the network in Q1 of 2024.

- [Pull Request](https://github.com/urbit/urbit/pull/6790)
