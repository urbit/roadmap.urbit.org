+++
title = "Overview"
+++

## Introduction

This roadmap describes the plan for making the Urbit OS suitable for mass
adoption. It is a living document, to be updated when milestones are achieved or
when plans change.

The following project arcs highlight our primary areas of focus for 2024,
updated as of December 2023. The individual projects within each of these arcs
can be viewed by status – Current, Next Up, Future, and Completed – in the left
hand navigation.

## Make Urbit Fast

Urbit has never been seriously optimized for performance, and that's changing in
early 2024.

We're going to accomplish this by completing two major projects:

1. The release of [Ares](/projects/ares), which offers multiple orders of
   magnitude better performance in general Nock computation.
2. An overhaul of the internals of our networking protocols that leverage
   substantially more performant encryption and congestion control.

[View Project Arc &rarr;](/arcs/make-fast)


## Increase Capability

We'll be giving Urbit much-needed capabilities that it doesn't currently have,
but has always promised to have, by the middle of 2024. These are:

1. The ability to store arbitrary amounts of data, and
2. A network-wide [Global
   Namespace](https://en.wikipedia.org/wiki/Global_Namespace) that allows any
   node to bind arbitrary data to an immutable, revision-controlled path

[View Project Arc &rarr;](/arcs/increase-capability)


## Plug Known Security Holes

Urbit is not securte today, but we do know how to secure it.

The most important effort is [userspace permissions](project), which provides a
security model for the barrier between different applications running in
userspace, as well as the interface between userspace applications and the
kernel.

[View Project Arc &rarr;](/arcs/plug-security-holes)


