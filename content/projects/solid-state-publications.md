+++
title = "Solid-State Publications"
arcs = ["Improve Network Performance", "Improve Backward Compatibility"]
start_date = "2022-10-25"
end_date = "2023-02-07"
owner = "~wicrum-wicrun"
status = "Current"
description = """
For scalability, basic solid-state publications are being prototyped.  This is the next step after basic remote scry toward scalable data publishing on Urbit.  These prototypes live in userspace; once we've proven the model with some real-world examples, we can build kernel support into Gall.
"""
+++

For scalability, basic solid-state publications are being prototyped.  This is the next step after basic remote scry toward scalable data publishing on Urbit.  These prototypes live in userspace; once we've proven the model with some real-world examples, we can build kernel support into Gall.

We expect solid-state publications to unblock the content distribution scaling bottleneck by letting applications distribute large amounts of data to many other ships efficiently without excessive load on the publisher ship.

Solid-state publications involve more changes to the system.  This project is also called "subscription reform", since it will reform Gall's idea of a subscription.  The basic idea is to let applications publish data into Urbit's "scry namespace".  This will allow for scalable reads of that data using the upcoming remote scry protocol.  It should also improve the developer experience by making it easier to write a pub-sub system in an application that is both reliable and scalable.

A solid-state publication is a state replication system.  The publishing application makes a piece of mutable state accessible at a subscription path -- such as a list of blog posts at `/~sampel-palnet/blog`.  The solid-state publication system then ensures that every subscriber has the same (i.e. noun-equal) state as the publisher.

The mechanism for synchronizing the state from publisher to subscribers is a shared event-log & snapshot system.  Each subscriber downloads a snapshot of the state when it first subscribes.  It then requests the next diff from the publisher.  When it receives this diff, it applies the diff to the snapshot to arrive at the next state.  It repeats this diff application until it's arrived at the most recent state.  Then the subscriber requests the next diff from the publisher -- this blocks until the new diff has been published, at which point Gall applies the diff the same way.

The steady-state operation of a solid-state publication, after a subscriber has finished initial synchronization, looks like this:
- publisher agent emits diff to Gall
- publisher Gall applies diff to publication, resulting in new publication state
- publisher Gall sends diff over the network to subscribers
- subscriber Gall receives diff over the network
- subscriber Gall applies diff to subscription, arriving at new publication state
- subscriber Gall notifiees subscriber agent with publication state and diff

Since snapshots will eventually be fetched using the remote scry protocol, the application should only store snapshots occasionally, and ideally on a fixed schedule, such as once every 100 diffs.  That way many subscribers joining within a short amount of time will download the same snapshot, and most of those download requests can be served by the runtime's scry cache without running Nock.

This system will eventually replace Gall's current `%watch` subscription mechanism.  For a while before that, both will be supported.  Not all of the solid-state publication submodules have been fully spec'd out yet, but many of them have.  Several changes to networking need to be made to support solid-state publications fully, and the userspace/kernelspace interface will need to change.

The first versions of solid-state publications will use Ames.  Once a basic remote scry protocol is added, public solid-state publications could use it for downloading snapshots, and applications like blogging that don't need low latency could usee it for downloading diffs too.  Latency-sensitive applications will need to download diffs over Ames until the "network push protocol" is added to reduce latency.  Using solid-state publications for private data requires encrypted remote scry, which encrypts scry paths and their values before sending them over the network.  Finally, a subscriber's initial request to find the latest revision number of a publication will use Ames until the `%pine` network protocol is added to take over that responsibility.

Applications will need to be able to to emit new kinds of requests to Gall to ask Gall to publish or subscribe to a solid-state publication, and Gall will need to deliver new kinds of events into subscriber applications to notify them that a new diff has been applied.

Some more descriptions of solid-state publications:
https://gist.github.com/belisarius222/0b53d59014a0a1b507363474a2dbe0ae
https://github.com/urbit/plan/blob/master/oort/infra-offsite/chat-scry.txt