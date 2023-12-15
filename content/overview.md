+++
title = "Overview"
+++

## Introduction

This roadmap describes the plan for making the Urbit OS suitable for mass adoption. It is a living document, to be updated when milestones are achieved or when plans change.

The following project arcs highlight our primary areas of focus for 2024, updated as of December 2023. The individual projects within each of these arcs can be viewed by status – Current, Next Up, Future, and Completed – in the left hand navigation.

## Make Urbit Fast

Urbit has never been seriously optimized for performance.  Two large development efforts, both scheduled for deployment in early 2024, will bring Urbit's performance up to what is needed for most social applications:

1. [Ares](/projects/ares), a clean-slate rewrite of the Nock interpreter, promises multiple orders of magnitude better performance in general Nock computation.
2. [Directed Messaging](/projects/directed-messaging), an overhaul of Urbit's networking stack will deliver drastic performance improvements.  The new system includes simpler and more robust relays and routing, much faster packet authentication, and runtime-based congestion control that removes most packet processing overhead.

[View Project Arc &rarr;](/arcs/make-fast)


## Increase Capability

We'll be giving Urbit much-needed capabilities that it doesn't currently have,
but has always promised to have, by the middle of 2024. These are:

1. The ability to store arbitrarily large amounts of data, and
2. A fully featured [Global Namespace](https://docs.urbit.org/system/kernel/arvo/guides/scry) that allows any node to bind arbitrary data to an immutable, revision-controlled path and distribute it to other nodes over the network.

[View Project Arc &rarr;](/arcs/increase-capability)


## Security against Malicious Apps

Urbit is not secure today, but we do know how to secure it.

The most important effort is [userspace permissions](/projects/userspace-permissions), which provides a
security model for the barrier between different applications running in
userspace, as well as the interface between userspace applications and the
kernel.

[Sandboxing browser clients](/projects/frontend-sandboxing) will complete permissions enforcement for Urbit applications.

[View Project Arc &rarr;](/arcs/plug-security-holes)


