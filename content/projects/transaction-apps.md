+++
title = "Transaction Apps"
date = "2019-05-30"
contributors = ["~wicdev-wisryt"]
status = "Completed"
+++

Gall agents are great at handling I/O that can be fully processed in a single
event. When it comes to complex asynchronous I/O that requires a series of
conditional interactions over multiple events, it's more difficult. In such
cases, handling intermediary states and possible failures part-way though the
series of events can introduce a great deal of complexity. This complexity
increases the risk of bugs, and makes maintaining the agent more difficult.

To make asynchronous I/O easier, a new set of libraries have been introduced
that implement an "asynchronous transaction monad". This works in a similar
fashion to Javascript promises, and lets you write imperative-looking inline
code to handle such I/O.

Three new libraries are included:

- `/lib/trad.hoon` - The asynchronous transaction monad.
- `/lib/tapp.hoon` - A library to create imperative-looking apps via the
  transaction monad.
- `/lib/stdio.hoon` - A set of useful asynchronous functions for various standard
  requests (HTTP, timers, pokes and peers, etc).

This framework also provides a straightforward upgrade approach for situations
where you're in the middle of an asynchronous computation. If you upgrade in the
middle of a computation, you can simply cancel the computation and restart it,
since computations are transactions that span multiple events.

## More info

- [Pull request in the old Arvo repo on Github](https://github.com/urbit/arvo/pull/1183)
