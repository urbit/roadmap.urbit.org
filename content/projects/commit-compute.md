+++
title = "Commit Before Compute"
duration = "1-3 Months"
manpower = "1-2 Engineers"
status = "Future"
lead = "TBD"
+++

Current Vere needs to run Nock on an event before it can write it to disk.  This places a lower bound on event latency, defined as time between receiving an event and performing its effects, at `D + N`, i.e. disk write latency (`D`) plus nock execution time (`N`).  Commit-before-compute has amortized latency `max(D, N)`, which is usually significantly better.

The way to get this low latency is to have Vere write ("commit") an event to disk without waiting for nock execution ("compute") to complete on that event -- hence the codename "commit before compute".  When a new event is received, Vere will try to run Nock on it if the "Mars" Nock worker process isn't already processing a previous event, and if the disk isn't already writing a previous event, Vere will also write it to disk.  Once the event has been both written to disk and executed, Vere will perform its effects.

Ensuring correct replay in the presence of nondeterministic errors requires modifying the event log to include periodic confirmations of which events were run successfully and which crashed nondeterministically.  It also requires being careful to make sure replay uses at least as many resources (primarily RAM) as the original run, so that an event that ran successfully the first time won't crash nondeterministically the second time, leading to an incorrect replay.