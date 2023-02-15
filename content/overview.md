+++
title = "Overview"
+++

## Introduction

This roadmap describes the plan for making the Urbit OS suitable for mass adoption. It is a living document, to be updated when milestones are achieved or when plans change.

The following project arcs need to be completed to make Urbit a consumer product. The individual projects within each of these arcs can be viewed by status – Current, Next Up, Future, and Completed – in the left hand navigation.

The rest of this document describes the strategies for achieving these goals.

## Increase Release Frequency

Increasing the speed of releases is the core dev team's highest priority, since it will accelerate the pace of development overall.
We will make a number of changes to the kernel and runtime for this purpose. We will also scale the team and its processes by providing better reference documentation, guides, training, roadmaps, and specifications.

[View Project Arc &rarr;](/arcs/increase-release-frequency)


## Improve Security

Much work remains to bulletproof Urbit to the point where it can not only defend its memory safety and cryptographic safety, but can also fend off denial of service attacks by dedicated assailants.

We will first secure the system against an individual or small group intending to casually DoS the network by spamming packets. Following this we will establish basic software supply chain protection, and then work to defend against exploits of memory corruption in the runtime to gain remote code execution.

[View Project Arc &rarr;](/arcs/improve-security)


## Increase Runtime Data Capacity

There are three main phases to increasing the amount of data the runtime can manage:
- Use pointer compression to max out the 32-bit allocator
- Improve auxiliary tooling to handle more data than fits in RAM
- Implement 64-bit or other more experimental increases in data storage

[View Project Arc &rarr;](arcs/increase-runtime-data-capacity)


## Zero-Click Maintenance

An Urbit ship should maintain itself so that a user does not need to intervene to keep it running properly. In order for this to be true, the ship needs to be reliable, handle upgrades properly, and manage its resources (e.g. RAM and disk space) efficiently.

[View Project Arc &rarr;](/arcs/zero-click-maintenance)


## Improve Network Performance

An ordinary Urbit ship needs to be able to host a large chatroom, in addition to other scaling considerations. The performance of Urbit's networking is the bottleneck limiting this kind of scaling at the moment.

A number of incremental improvements need to be made to the implementation of Ames, Urbit's networking protocol, including fixes for flaky connections and more efficient use of timers. A second protocol called Fine will also be added for scalable content distribution. A multi-part project called "subscription reform" will allow apps to use this protocol effectively.

[View Project Arc &rarr;](/arcs/improve-network-performance)


## Reduce Hosting Costs

Running an Urbit hosting company needs to have low enough unit costs per ship to have the possibility of profit. Some of the costs of hosting have to do with Urbit resource usage, especially RAM. Other costs stem from maintenance burden and difficulties with supervising Urbit processes from hosting environments.

Demand paging in the runtime promises to reduce RAM usage significantly. Establishing "quiescence" should also reduce costs, by letting a host move a ship's data out of RAM into disk-based storage when not in use.

[View Project Arc &rarr;](/arcs/reduce-hosting-costs)


## Improve Backward Compatibility

As it stands, every Kelvin change breaks backward compatibility, requiring app devs to publish modified code so their users can keep the app running. This needs to happen less frequently over time, until eventually apps can be "write once, run forever."

Within the next few years, we need to get to the point where future changes never necessitate deprecating old functionality. This requires stabilizing the interface the kernel presents to applications, so that old features are worth committing to maintaining, and future changes to the interface will be small enough that writing shims is not onerous.

[View Project Arc &rarr;](/arcs/improve-backward-compatibility)


## Improve Developer Experience

[View Project Arc &rarr;](/arcs/improve-backward-compatibility)
