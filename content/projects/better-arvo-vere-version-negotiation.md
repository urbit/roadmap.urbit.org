+++
title = "Better Arvo/Vere Version Negotiation"
duration = "TBD"
manpower = "TBD"
owner = "TBD"
status = "Future"
description = """
Improving the Arvo/Vere version negotiation will increase release rate by reducing the amount of work it takes to release a new Kelvin version.
"""
+++

Improving the Arvo/Vere version negotiation will increase release rate by reducing the amount of work it takes to release a new Kelvin version.

It should be more flexible to allow for a wider variety of deployment patterns, such as pushing out Arvo at a new Kelvin version without updating the runtime -- this kernel would need to communicate with the runtime in compatibility mode, avoiding use of any new features that the old runtime can't support.
