+++
title = "Add %pine Query-At-Latest Protocol"
arcs = ["Improve Network Performance"]
status = "Future"
manpower = "1-2 Engineers"
duration = "1-2 Months"
owner = "TBD"
description = """
Remote scry on its own doesn't let one ship determine the latest state of a publication on another ship.  This is solved by adding another protocol alongside the remote scry network protocol to implement `%pine` query-at-latest requests over the network, as pure reads.
"""
+++

Remote scry on its own doesn't let one ship determine the latest state of a publication on another ship.  This is solved by adding another protocol alongside the remote scry network protocol to implement `%pine` query-at-latest requests over the network, as pure reads.

The proposal is here (it's not quite a spec yet, but close):
https://gist.github.com/belisarius222/95ad2a5f650ce90a61bb575f9ce1bcba

`%pine` depends on the remote scry protocol.