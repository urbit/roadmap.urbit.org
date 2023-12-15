+++
title = "Security Against Malicious Apps"
class = "bg-green-400"
+++

Urbit is not secure today, but we do know how to secure it.

The most important effort is [userspace permissions](/project/userspace-permissions), which provides a
security model for the barrier between different applications running in
userspace, as well as the interface between userspace applications and the
kernel.

[Sandboxing browser clients](/project/frontend-sandboxing) will complete permissions enforcement for Urbit applications.
