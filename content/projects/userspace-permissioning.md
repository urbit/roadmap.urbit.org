+++
title = "Userspace Permissioning"
end_date = "2023-03-01"
status = "Current"
lead = "~palfun-foslup"
description = """
Kernel and applications are both unprotected against malicious applications until userspace permissioning is added.
"""
+++

Kernel and applications are both unprotected against malicious applications until userspace permissioning is added.

The idea of permissioning is relatively straightforward: the kernel should protect itself from applications, and it should protect applications from each other.  This is similar to the iOS app permissioning system, with some differences because Urbit is a server and not all applications are interactive -- some are more like background services.

`~palfun-foslup` is working on this now.  While the basic concept is relatively simple, implementing permissions in a way that preserves invariants correctly across upgrades and doesn't confuse the user requires careful thought and probably some iteration.  Permissions for scry also might require multiple tries to get right, and we likely won't know until we have some experience working with encrypted remote scry.
