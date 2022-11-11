+++
title = "New Ames"
date = "2019-12-04"
contributors = ["~rovnys-ricfer", "~wicdev-wisryt"]
status = "Completed"
description = """
A rewrite of the networking protocol to extend inter-ship subscription mechanics.
"""
+++

Previously, the networking [Vane](https://urbit.org/docs/glossary/vane)
[Ames](https://urbit.org/docs/glossary/ames) did not fully extend Arvo's
internal `duct` messaging mechanics across the network. You could `%pass`
messages to other ships, but they could not `%give` any response apart from an
"ack" (acknowledgement). This made inter-ship subscription mechanics
complicated, since it meant you needed a separate system to track which response
corresponded to which subscription.

New Ames allows `%give` responses over the network, greatly simplifying
subscriptions, and therefore Gall and Gall agents. Additionally, it introduces a
system for handling "back pressure", so Gall can automatically kick a subscriber
if too many unsent outbound messages accumulate. It also simplifies the Ames
protocol.
 
## More info

- [Pull request on Github](https://github.com/urbit/urbit/pull/1996)
- [Ames overview](https://urbit.org/docs/arvo/ames/ames) - technical
  documentation of the Ames Vane.
