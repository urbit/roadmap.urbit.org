+++
title = "Separating IPC Streams"
arcs = ["Reduce Hosting Costs"]
manpower = "1 Engineer"
duration = "1 Month"
status = "Future"
owner = "TBD"
description = """
Urth/Mars communication all happens within a single IPC connection.  Separating communication that's unrelated to the event loop (such as logging, scry requests and responses, spinner status notifications, and snapshot notifications) into separate IPC streams should improve performance and increase flexibility for alternate Mars implementations.
"""
+++

Urth/Mars communication all happens within a single IPC connection.  Separating communication that's unrelated to the event loop (such as logging, scry requests and responses, spinner status notifications, and snapshot notifications) into separate IPC streams should improve performance and increase flexibility for alternate Mars implementations.
