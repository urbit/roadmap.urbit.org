+++
title = "Encrypted Remote Scry"
arcs = ["Improve Network Performance"]
duration = "2-3 Months"
manpower = "1-2 Engineers"
status = "Future"
owner = "TBD"
description = """
Arvo needs to encrypt scry paths and the values bound to them in order to use the remote scry protocol for private data such as group chats.  This requires changes to the kernel to distribute encryption keys and let applications determine which other ships should have access to data in which publications.
"""
+++

Arvo needs to encrypt scry paths and the values bound to them in order to use the remote scry protocol for private data such as group chats.  This requires changes to the kernel to distribute encryption keys and let applications determine which other ships should have access to data in which publications.

This has been specified informally and partially implemented:
https://github.com/urbit/urbit/tree/ted/encrypted-scry

It has a hard dependency on basic remote scry.  This work also relates to userspace permissioning work, so its design should be reviewed in light of recent changes to userspace permissioning.
