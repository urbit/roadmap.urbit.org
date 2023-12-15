+++
title = "Userspace Permissioning"
arcs = ["Security Against Malicious Apps"]
end_date = "2024-08-30"
status = "Next Up"
owner = "~palfun-foslup"
contributors = ["~palfun-foslup", "~tinnus-napbus"]
description = """
Kernel and applications are both unprotected against malicious applications until userspace permissioning is added.
"""
+++

Kernel and applications are both unprotected against malicious applications
until userspace permissioning is added.

The idea of permissioning is relatively straightforward: the kernel should
protect itself from applications, and it should protect applications from each
other. This is similar to the iOS app permissioning system, with some
differences because Urbit is a server and not all applications are interactive
-- some are more like background services.

While the basic concept is relatively simple, implementing permissions in a way
that preserves invariants correctly across upgrades and doesn't confuse the user
requires careful thought and probably some iteration. Permissions for scry also
might require multiple tries to get right, and we likely won't know until we
have some experience working with encrypted remote scry.

- [PR](https://github.com/urbit/urbit/pull/6493)
- [Related PR](https://github.com/urbit/urbit/pull/6605)
