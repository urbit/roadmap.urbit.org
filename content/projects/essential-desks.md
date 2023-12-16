+++
title = "Essential Desks"
arcs = ["Improve Developer Experience"]
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0109.md"
start_date = "2023-12-01"
end_date = "2024-01-31"
duration = "1-2 Months"
manpower = "1 Developer"
status = "Current"
owner = "~wicdev-wisryt"
contributors = ["~borref-tonnel"]
description = """
Introduces a distinction between essential desks and non-essential desks, where only essential desks will block upgrades. Newly installed desks will default to non-essential.
"""
+++

We commonly install an Urbit app on a whim, and then when a kelvin update arrives, it blocks the upgrade because it's not yet compatible with the new version. This frustrates the user and lowers the general health of the network by causing many ships to fall out of date. We propose introducing a distinction between essential desks and non-essential desks, where only essential desks will block upgrades. Newly installed desks will default to non-essential.

## Motivation

An important part of the experience of using Urbit is installing apps fearlessly: you should be able to install a desk without worrying that it will compromise the integrity of the system or cause problems down the line.

One of the handful of reasons why this isn't currently the case (along with a lack of a security model, which is not addressed here) is that when you install a desk, you're implicitly telling the system that this desk is very important, and it should never cause it to stop working without explicit consent from the user. Especially, this means that a kelvin upgrade cannot occur if that desk is not compatible with the new kelvin. This commonly stops kelvin upgrades from proceeding automatically.

It's very bad for kelvin updates to be delayed for very long. The user will stop getting updates even on their other desks (since those updates are for the new kelvin), and so networked apps will generally stop working over time. This also makes it difficult for developers to fix problems they find in their desks (including security problems), and even bugs we find in the core system. This also introduces a significant burden for hosting providers if they want to provide a consistenly good user experience to users, since many of their users will fall out of date.

This situation arises because we don't want to suspend a user's app just to upgrade the system -- after all, Urbit exists to run apps, not apps for Urbit. If the main app that a user cares about is suspended to run an upgrade, their experience is significantly diminished, even if it's only for a couple days before the developer updates the app to be compatible with the new kelvin.

## Code

- [Pull Request](https://github.com/urbit/urbit/pull/6862)
