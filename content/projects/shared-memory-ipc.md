+++
title = "Shared Memory IPC"
duration = "2-3 Months"
manpower = "1-2 Engineers"
status = "Future"
lead = "TBD"
+++

Vere's two processes, Urth (the I/O process) and Mars (the Nock worker process), communicate using a custom noun-based interprocess communication (IPC) protocol.  This currently uses the Unix stdin and stdout, but using shared memory instead would make IPC significantly faster, reducing event processing latency and improving overall data throughput.

Fast IPC will be especially important once the Urth process is broken up into multiple processes, since instead of an incoming event being sent over IPC once before being run in Arvo, it will be sent twice -- once from the I/O driver process to Urth, then again to the Mars process.

It might be possible to reuse off-the-shelf shared-memory IPC systems, such as Arcan's IPC mechanism or Chromium's "mojo" system.
