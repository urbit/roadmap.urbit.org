+++
title = "Gall Agent Backups"
arcs = ["Improve Developer Experience"]
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0110.md"
date = "2023-10-09"
status = "Completed"
owner = "~midden-fabler"
contributors = ["~midden-fabler", "~mopfel-winrux"]
description = """
Exposes agent state in a %gall scry endpoint enabling agent backup and restoration.
"""
+++

Exposes agent state in a %gall scry endpoint enabling agent backup and restoration, allowing devs to opt in to implementing restore functionality.

## Motivation

The primary motivation behind adding a new scry endpoint to the agent is to
facilitate the essential task of enabling backups for gall agents. As the
current scrys in place prove insufficient for backing up these critical agents,
the need for a more specialized and robust scry endpoint becomes evident. By
introducing a dedicated backup-enabled scry endpoint, the agent's functionality
and data preservation capabilities will be significantly enhanced, ensuring the
safeguarding of vital information and enabling seamless recovery in the event of
unexpected failures or data loss. This improvement will not only provide peace
of mind for users but also enhance the overall reliability and resilience of the
agent's operations.

## Code

This will be released to the network in Q1 of 2024 with the 411K release.

- [Pull Request](https://github.com/urbit/urbit/pull/6785)
