+++
title = "Encrypted Remote Scry"
arcs = ["Improve Network Performance"]
start_date = "2023-09-01"
end_date = "2023-12-15"
duration = "2-3 Months"
manpower = "1 Engineers"
status = "Current"
owner = "~hastuc-dibtux"
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0118.md"
description = """
Arvo needs to encrypt scry paths and the values bound to them in order to use the remote scry protocol for private data such as group chats.  This requires changes to the kernel to distribute encryption keys and let applications determine which other ships should have access to data in which publications.
"""
+++

Arvo needs to encrypt scry paths and the values bound to them in order to use the remote scry protocol for private data such as group chats.  This requires changes to the kernel to distribute encryption keys and let applications determine which other ships should have access to data in which publications.

- [Pull Request](https://github.com/urbit/urbit/pull/6790)
