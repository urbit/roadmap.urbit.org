+++
title = "Epoch System"
arcs = ["Zero-click Maintenance"]
date = "2023-09-18"
owner = "~mastyr-bottec"
status = "Completed"
contributors = ["~mastyr-bottec"]
description = """
Chunk Event Log into Epochs
"""
+++

Historically, Vere has stored a single event log and snapshot.  To 
facilitate replay across different binary versions more convenient 
and less error-prone, an improved design is the "epoch" system.

In the epoch system, Vere breaks up the event log into "epoch"s, where an epoch
represents a snapshot and some events after that snapshot. An epoch lives in its
own folder, named after the first event in that epoch.

In addition to storing a snapshot and a log of events, each epoch folder also
stores a version file indicating which version of Vere originally ran these
events -- this makes replay across different binary versions much easier,
especially in the case of a jet mismatch in an old binary.
  
## Code

This will be released in January of 2024.

- [Pull Request](https://github.com/urbit/vere/pull/459)
