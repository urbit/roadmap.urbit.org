+++
title = "Stateless Forwarding"
date = "2020-08-06"
contributors = ["~palfun-foslup"]
status = "Completed"
description = """
Stateless packet forwarding allows ships to relay packets to
other ships without writing to their own event log.
"""
+++

When ships receive packets destined for a ship other than themselves, they
forward them on a route to the intended recipient if possible. To do this, they
must look up the intended recipient in the routing table in Ames. Previously,
this has been a stateful event which must be recorded in the ship's event log.
For infrastructural nodes such as Galaxies who must route a large number of
packets, this has resulted in very substantial event log bloat.

To solve this issue, stateless packet forwarding has been introduced. Ames
packets have been restructured so they don't need to be fully deserialized in
order to discover the recipient, and the runtime has been updated to scry the
necessary data out of the ship's state without producing an event. This
radically reduces event log bloat for Galaxies, and also improves packet routing
performance.

## More info

- [Pull request on Github](https://github.com/urbit/urbit/pull/3174)
