+++
title = "Basic Remote Scry Protocol"
arcs = ["Improve Network Performance", "Improve Backward Compatibility"]
spec = "https://gist.github.com/belisarius222/d9a9c164817d3e8bbda3c45f7d2000b9"
start_date = "2021-01-01"
end_date = "2023-01-15"
duration = "1-2 Months"
manpower = "1-2 Engineers"
lead = "~rovnys-ricfer"
status = "Next Up"
description = """
The "Fine" remote scry protocol will form the foundation of scalable content distribution in Urbit, by allowing many subscriber ships to read data efficiently from a publisher ship without incurring excessive load on the publisher.
"""
+++

The "Fine" remote scry protocol will form the foundation of scalable content distribution in Urbit, by allowing many subscriber ships to read data efficiently from a publisher ship without incurring excessive load on the publisher, which is the bottleneck.

Solid-state publications can be implemented without this by using the existing Ames protocol to publish data, the way Urbit works now -- this will achieve the reliability and developer experience goals of solid-state publications, but not the scaling goals.

Many of the other networking projects build on top of Fine to bring the system closer to the solid-state, referentially transparent future that Urbit promises.

Fine has been implemented and tested some on a testnet, but it will need more testing before deployment.  It affects both Arvo and Vere and requires a Kelvin bump.

- [PR](https://github.com/urbit/urbit/pull/5878)
