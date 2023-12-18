+++
title = "Sticky Scry"
arcs = ["Increase Capability"]
status = "Next Up"
owner = "~rovnys-ricfer"
start_date = "2024-06-30"
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0100.md"
description = """
Sticky scry aims to enable cross-ship subscriptions using the remote scry protocol (Fine). 
"""
+++

Sticky scry enables cross-ship subscriptions using the remote scry protocol (Fine) by making scry requests for paths that are known to be part of publications "sticky" on the publisher, so they persist long enough that when the path does get grown, the response can be sent down to requesters immediately.

Sending responses immediately only works if Vere somehow finds out from Arvo that a request can now be fulfilled. This proposal advocates for Arvo to emit an effect whenever a new piece of concrete data is added to the scry namespace: a Clay commit with new files, a Gall %grow move from an agent to bind a new path, or Eyre binding a new static response to a mutable URL.

## Motivation

The basic Fine implementation does not support low-latency subscriptions. If the subscriber ship has received the nth datum in a subscription, it can use Fine to ask for the n+1th datum by requesting data at the path that's identical to the first except for an incremented revision number. The subscriber will retry that request on a timer indefinitely, so after the publisher has grown the new path binding, the subscriber ship will receive the new datum, but only after half the retry interval on average.

Given the current Fine backoff interval of two minutes, a request for the next datum will only resolve after a minute. This is too much latency for many Urbit applications, including most social applications such as chat.

Ideally, Urbit wouldn't need any session-based protocol to ensure low latency on responses to scry requests whose paths haven't been bound yet when the publisher receives the request; instead, the basic remote scry protocol would handle this.
