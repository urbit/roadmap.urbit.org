+++
title = "Epoch System"
arcs = ["Zero-click Maintenance"]
start_date = "2021-03-27"
end_date = "2023-04-28"
owner = "~mastyr-bottec"
status = "Current"
description = """
Chunk Event Log into Epochs
"""
+++

Historically, Vere has stored a single event log and snapshot.  To 
facilitate replay across different binary versions more convenient 
and less error-prone, an improved design is the "epoch" system.

In the epoch system, Vere breaks up the event log into "epoch"s, where 
an epoch represents a snapshot and some events after that snapshot.  
An epoch lives in its own folder, named after the first event in that epoch.  
In addition to storing a snapshot and a log of events, each epoch folder 
also stores a version file indicating which version of Vere originally ran 
these events -- this makes replay across different binary versions much 
easier, especially in the case of a jet mismatch in an old binary.

There is a now-closed implementation of the epoch system built on top of the
[Mars/Urth Split](/project/mars-urth), but since that effort is 
currently halted, an implemention using current (pre-split) Vere is 
underway.

- [Tracking issue for epoch system](https://github.com/urbit/vere/issues/313)
- [Original (now closed) PR for epoch system](https://github.com/urbit/urbit/pull/5701)
