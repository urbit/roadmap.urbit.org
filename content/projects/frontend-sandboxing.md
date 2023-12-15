+++
title = "Frontend Sandboxing"
arcs = ["Security Against Malicious Apps"]
duration = "3-6 Months"
manpower = "1-2 Engineers"
status = "Next Up"
owner = "~wicdev-wisryt"
description = """
Sandboxing browser clients will prevent malicious apps from using their clients to circumvent userspace permissions policies.
"""
+++

An Urbit app generally consists of a backend component, written in Hoon, that runs inside Urbit, and a frontend component that's often a web application.  Urbit will lean on browsers' "cross-origin resource sharing" system and its own security model to enforce that each browser-based frontend can only communicate with its corresponding backend app inside Urbit -- not with the kernel or any other applications.  This prevents a malicious app from using its frontend to circumvent userspace permissions policies.
