+++
title = "Symmetric Routing"
arcs = ["Improve Network Performance"]
duration = "3-6 Months"
manpower = "1-2 Engineers"
status = "Future"
lead = "~rovnys-ricfer"
description = """
Symmetric routing should improve multiple things about Ames networking, enabling star packet forwarding, as well as improving firewall flakiness and peer discovery.
"""
+++

Symmetric routing should improve multiple things about Ames networking:
- stars will forward packets, not just galaxies
- it fixes flakiness from firewalls
- peer discovery will be simpler and more regular
- its simplicity makes building other protocols easier

Specification: 
https://gist.github.com/belisarius222/7ec6f40b3a498c38e696139d8dbd8b10
