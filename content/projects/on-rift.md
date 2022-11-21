+++
title = "Add +on-rift or Similar For Userspace Breach Handling"
duration = "1 Month"
manpower = "1 Engineer"
lead = "TBD"
status = "Future"
description = """
Applications often have bugs when a peer breaches.  Modifying the userspace/kernelspace API to give Gall agents clearer information about breaches should improve application reliability and developer experience.  
"""
+++

Applications often have bugs when a peer breaches.  Modifying the userspace/kernelspace API to give Gall agents clearer information about breaches should improve application reliability and developer experience.  One proposal is to add a new `+on-rift` arm to Gall agents to ensure they are always informed about breached peers.

A PR for `+on-rift` can be found here:
https://github.com/urbit/urbit/pull/5338