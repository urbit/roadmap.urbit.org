+++
title = "Directed Messaging"
arcs = ["Make Urbit Fast"]
spec = "https://gist.github.com/belisarius222/7ec6f40b3a498c38e696139d8dbd8b10"
start_date = "2023-10-01"
end_date = "2023-04-01"
duration = "3-6 Months"
manpower = "4 Developers"
status = "Current"
owner = "~master-morzod"
contributors = ["~master-morzod", "~hastuc-dibtux", "~watter-parter", "~norsyr-torryn", "~dinleb-rambep"]
description = """
An overhaul of Urbit's networking stack for much higher throughput and increased connection stability.
"""
+++

The "directed messaging" project consists of a full-stack rewrite of Urbit's networking intended for much higher (100-100x) throughput and increased connection stability.  It's called "directed" because the new design imposes a request/response discipline across all layers of the stack.  Making this polarity legible has enabled a slew of simplifications and optimizations.

For background, as of 2023 Urbit has two communication protocols: Ames, for sending commands and receiving acknowledgments; and Fine, a "remote scry protocol" for reading data out of other ships -- specifically, out of their scry namespaces.  Both protocols are forms of one-to-one communication between two Urbit nodes.  They both use Urbit's "galaxy" supernodes for peer discovery, and for packet relaying in case the nodes are behind firewalls.

The designs and implementations of these protocols impose enormous performance overhead, causing them to both have quite low throughput: on the order of a megabit per second, even on a gigabit internet connection.  The directed messaging project removes these overheads almost entirely, bringing the throughput much closer to the maximum supported by the underlying hardware.

The first change this new design makes is to tag every packet as either a request or a response.  For reads, a request contains a "scry path" (Urbit's version of a URL), and a response contains the data that path refers to.  For writes (commands), a request contains the contents of the command, and a response contains an acknowledgment.  Tagging each packet this way enables "directed routing".

Directed routing uses a simplification of the routing design from Van Jacobson's [Named Data Networking](https://named-data.net/project/) project, in which a request is routed to the next relay by looking at its request path (in Urbit's case, a scry path), and a response is routed back to wherever the request came from.  This means a response takes the exact reverse path through the network of the request that it satisfies.

Directed routing has a number of advantages over Ames's current routing, which has proven complex and finicky.  The biggest advantage is that by applying the request/response constraint, the whole routing probllem is made simpler and easier, making the routing semantics in turn easier to reason about and implement correctly.  For example, unlike in the current design, publisher nodes never need to persist routes to subscriber nodes, since each subscriber remembers the route to the publisher and the publisher can just hold the immediate transport address (IP+port) it heard a request packet from temporarily to route responses back to it; the other relays will handle returning the response to the original requesting node.

The second big change in this new design is to assign a scry path to every packet and message -- this explicitly lays out all packets and messages in Urbit's scry namespace.  One reason to do this is that it allows all large pieces of data to be "pulled" by the node who will receive them, rather than "pushed" by the sending node as in the case now for Ames commands.  With everything as pull rather than push, packet-level operations can be abstracted away from senders, which means there can be a single state machine for managing downloads, no matter whether the datum being downloaded is an Ames command to be performed (a write) or another kind of data to be read from another node's nameespace (a read).

This state machine for managing downloads uses a congestion control algorithm to determine how many request packets to send at what rate, to maximize the throughput without overloading the underlying hardware.  In all previous protocols, this state machine has been part of the Ames vane (kernel module) inside Urbit's Arvo kernel.  Arvo is a transactional system, so every time an Urbit node receives a response packet and wants to figure out how many new requests packets it should send to max out the connection, it must first write the incoming response packet to disk.  Since each packet contains a data payload of a kilobyte, this means the system needs to do a disk write for every kilobyte -- absurdly high overhead for a production system.

By moving all congestion control to pull, the state machine can be moved out of Urbit's kernel into its runtime -- the processor-native code that runs Urbit.  In addition to getting rid of the per-packet disk writes, this means Urbit's packet handling will no longer need to engage in Unix interprocess communication, which has some overhead. Nor will it need to run any Nock: the packet processing state machine can be written in a hot loop in C, sidestepping the biggest slowdowns of the current system.

The final remaining slowness of current Urbit packet processing lies in packet authentication: when a node receives a packet from another node, how does it verify that it was actually the sender node who sent the packet, not a malicious actor who forged a packet to deny service or otherwise interfere with healthy network operation?

In the current Fine protocol, for performing reads, every packet contains a digital signature.  This prevents forgery, but at the cost of multiple milliseconds for each packet -- another slapstick-level performance disaster.

In directed messaging, a novel packet authentication scheme called "LockStep" reduces packet authentication time to a single Blake3 hash operation, which is orders of magnitude faster.

These changes combine to ensure bulletproof peer-to-peer routing and low performance overhead, getting Urbit out of the way and letting application programmers make effective use of the networking hardware.