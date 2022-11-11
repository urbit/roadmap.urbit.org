+++
title = "Separating IPC Streams"
manpower = "1 Engineer"
duration = "1 Month"
status = "Future"
lead = "TBD"
+++

Urth/Mars communication all happens within a single IPC connection.  Separating communication that's unrelated to the event loop (such as logging, scry requests and responses, spinner status notifications, and snapshot notifications) into separate IPC streams should improve performance and increase flexibility for alternate Mars implementations.
