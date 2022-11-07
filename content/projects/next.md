# Next Projects

After all the current projects are released, some projects are next up.

## Breadth-First Arvo Move Order

One of these is breadth-first move order in Arvo.  This intends to improve the reliability of parts of the kernel, including upgrades and breach handling, by modifying the order in which Arvo dispatches moves to vanes: https://github.com/urbit/urbit/pull/6041

## GRQF Bug Fixing

A bug in the "gall request queue fix" work is an occasional crash with the error message "ack crashed exit".  This is high priority to fix, while the GRQF project is still fresh in people's minds.  It is likely a relatively small project.

## Validate Ames Packets in Vere

One thing we can do to begin protecting against DoS is to validate packets in Vere before injecting them as Arvo events.  This will make it harder for an attacker to lock up a victim's event loop, and it should be a straightforward project.

## Jet Dashboard Experiments

Experimenting with different designs for the jet dashboard is also high priority, since it could improve performance, security, and general simplicity of the codebase.  Backporting New Mars's "subject knowledge analysis" to Vere is worth trying, for similar reasons.

## Encrypted Remote Scry
