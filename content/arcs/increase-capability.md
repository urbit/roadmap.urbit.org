+++
title = "Increase Capability"
class = "bg-[#ad5c59]"
+++

Urbit isn't a complete system yet, and certain parts of its design that were
always planned have not yet materialized. Two major capabilities we'll introduce
in 2024 are:

1. The ability to store arbitrary amounts of data, and
2. A networked global namespace.

Urbit's first runtime was written as a 32bit architecture, meaning an Urbit node
could only address 32 bits of memory, limiting data storage to 2GB. This was the
case up until late 2022, and with a couple of
[clever](https://github.com/urbit/urbit/releases/tag/urbit-v1.13)
[hacks](/project/pointer-compression-8gb-loom) we were able to increase capacity
to 8GB; however, this is still insufficient for numerous use-cases.

Ares solves this problem virtue of being written with a 64 bit architecture, and
its Persistent Memory Arena (PMA) is written with demand paging from the start
to ensure efficient memory management. 

Urbit's global namespace allows any node on the network to bind arbitrary data
to an immutable, revision-controlled path. Our implementation of the global
namespace (which is heavily inspired by the [Named Date
Networking](https://named-data.net/project/) project) revolves around the
concept of [remote
scry](https://docs.urbit.org/userspace/apps/guides/remote-scry). We released the
initial part of remote scry earlier this year, but further work is needed for it
to become a true global namespace. When completed, it will enable:

- A fast and scalable subscription system
- Automatic caching of arbitrary content
- Content distribution for a P2P network at scale
- Links to arbitrary content
