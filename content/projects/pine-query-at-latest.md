+++
title = "Add %pine Query-At-Latest Protocol"
arcs = ["Increase Capability"]
status = "Next Up"
start_date = "2024-04-01"
end_Date = "2024-06-30"
manpower = "1-2 Developers"
duration = "1-2 Months"
owner = "~dinleb-rambep"
description = """
Remote scry on its own doesn't let one ship determine the latest state of a publication on another ship.  This is solved by adding another protocol alongside the remote scry network protocol to implement `%pine` query-at-latest requests over the network, as pure reads.
"""
+++

Remote scry on its own doesn't let one ship determine the latest state of a publication on another ship.  This is solved by adding another protocol alongside the remote scry network protocol to implement `%pine` query-at-latest requests over the network, as pure reads.

The proposal is here (it's not quite a spec yet, but close):
https://gist.github.com/belisarius222/95ad2a5f650ce90a61bb575f9ce1bcba

`%pine` depends on the remote scry protocol.

