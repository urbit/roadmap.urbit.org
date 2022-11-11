+++
title = "Dropping Privileges"
duration = "TBD"
manpower = "TBD"
lead = "TBD"
status = "Future"
+++

According to the principle of least privilege, each Vere process should only have privileges from the host operating system that it needs for normal operation.  This is easier to understand, and likely easier to implement well, with multiprocess I/O.

For instance, the Ames I/O driver process should only be allowed to use a UDP port, perform DNS lookups, and send IPC messages to the Urth process.  That way if it gets hijacked, it will be much harder for it to interfere with Urbit or the rest of the host machine.

This is best considered a defense-in-depth approach to security, to minimize the damage from a single part of the system getting hijacked.