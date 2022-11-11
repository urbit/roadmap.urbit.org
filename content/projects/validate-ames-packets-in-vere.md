+++
title = "Validate Ames Packets in Vere"
manpower = "1 Engineer"
duration = "1 Month"
status = "Next"
lead = "TBD"
+++

One of the first things we can do to begin protecting against DoS is to validate packets in Vere before injecting them as Arvo events.  This will make it harder for an attacker to lock up a victim's event loop, and it should be a straightforward project.

Without this, every packet a ship receives must be processed in the single-threaded Arvo event loop, blocking other events and causing CPU usage that could be used in a denial of service attack.  If Vere validates the packets first, it can more quickly drop malicious packets, without running Nock or blocking the event loop.
