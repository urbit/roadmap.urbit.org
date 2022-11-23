+++
title = "Multiprocess Event Log"
duration = "TBD"
manpower = "TBD"
status = "Future"
lead = "TBD"
description = """
Similarly to breaking up the Urth process, we should split event log reading and writing into its own process, which will communicate with the Mars Nock runner process. 
"""
+++

Similarly to breaking up the Urth process, we should split event log reading and writing into its own process, which will communicate with the Mars Nock runner process.  This makes it easier to swap in a different persistence mechanism, including FoundationDB for event log replication.

Note that without shared memory IPC, this will likely slow down the system.