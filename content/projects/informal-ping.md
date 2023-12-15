+++
title = "Informal Ping"
arcs = ["Improve Network Performance", "Make Urbit Fast"]
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0112.md"
date = "2023-12-08"
contributors = ["~master-morzod", "~norsyr-torryn", "~dinleb-rambep"]
status = "Completed"
description = """
Introduces an informal (stateless) ping mechanism, moving route maintenance out of arvo and dramatically reducing the load on galaxies, without requiring operator configuration.
"""
+++

For any ship to be accessible to others in the network, its sponsoring galaxy must be able to forward packets to it. For the sponsoring galaxy to forward packets to a ship, it must have a lane to that ship; to learn a lane to a ship, one must hear packets from that ship.

Galaxies are always axiomatically available: any ship must always be able to get packets to their galaxy. Routinely pinging the sponsoring galaxy serves two purposes: the galaxy can learn a route to the ship in question (always direct), and any stateful firewalls or "NAT pinholes" are kept open, maintaining the route so that the galaxy can use it to forward requests to us.

## Motivation

Many local networks are configured to enforce client/server behavior: inbound packets from the broader internet are not allowed on to the local network unless they can be interpreted as a response to a request previously issued from the local network. Practically, this means that peers on such a network must send packets first before they can be received, and must resend often to maintain inbound connectivity -- the de-facto timeout for such behavior is ~s30.

These pings are currently stateful request messages (ie, pokes). Since they must be sent quite frequently, the load they impose on the galaxies is substantial. If we assume that a poke (and the associated disk write) takes 5ms and every ship must ping their galaxy every ~s25, galaxies can forward for no more than 5000 ships (of any class). That puts a hard upper bound of 1.2 million active ships on the entire network (assuming all galaxies active and perfect distribution across them).

This scaling limit can be raised dramatically by decoupling these functions of the galaxy pings: allowing the galaxy to observe that our route has changed, and maintaining an inbound route from our galaxy through stateful firewalls and/or NAT devices.

## Code

This will be released to the network in Q1 of 2024 with the 411K release.

- [Arvo PR](https://github.com/urbit/urbit/pull/6836)
- [Runtime PR](https://github.com/urbit/vere/pull/545)
