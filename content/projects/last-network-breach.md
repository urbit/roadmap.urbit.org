+++
title = "The Last Network Breach"
date = "2020-12-08"
status = "Completed"
+++

Throughout Urbit's development, changes to the
[Ames](https://urbit.org/docs/glossary/ames) network protocol have sometimes
required a reset of the network state, essentially creating a new network (this
is somewhat analogous to a "hard fork" on a blockchain). In the past, this has
required users to take some action in order to get on the new network.

As Urbit has matured, network resets have become less frequent. This network
introduces version negotiation between
[Arvo](https://urbit.org/docs/glossary/arvo) (Urbit's OS) and
[Vere](https://urbit.org/docs/glossary/vere) (Urbit's runtime), allowing each to
be updated separately without worrying about an incompatibility on ships. For
example, if you are running Vere 1.0 and an OTA (over-the-air) update of Arvo
goes out that requires Vere 2.0, your ship will simply drop the update and
notify you that you need to update your binary in order to receive the next
update. When you update your binary is up to you.

The introduction of version negotiation means we can be optimistic that this
will be the last reset, as all future updates to the network can be distributed
as OTA (over-the-air) updates, possibly accompanied by a notification to update
a binary version.
