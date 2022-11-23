+++
title = "Reduce Hosting Costs"
color = "#8DB1D1"
+++

Running an Urbit hosting company needs to have low enough unit costs per ship to have the possibility of profit.  Some of the costs of hosting have to do with Urbit resource usage, especially RAM.  Other costs stem from maintenance burden and difficulties with supervising Urbit processes from hosting environments.

Demand paging in the runtime promises to reduce RAM usage significantly.  Establishing "quiescence" should also reduce costs, by letting a host move a ship's data out of RAM into disk-based storage when not in use.