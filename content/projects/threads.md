+++
title = "Threads"
date = "2019-12-04"
contributors = ["~wicdev-wisryt"]
status = "Completed"
+++

Back in May 2019, the concept of "transactional applications" were introduced,
along with three libraries: `/lib/trad.hoon`, `/lib/tapp.hoon`, and
`/lib/stdio.hoon`. In brief, these allowed developers to have inline
asynchronous I/O computations in their Gall agents, in a similar manner to
Javascript Promises.

With Gall being recently updated to a "static" design, the transactional app
system has been changed to work with the new Gall agents. Rather than having the
async code inside the Gall agent itself, there is now a separate agent called
Spider which manages "threads".

Threads are the new stand-alone version of transactional apps. Each thread is a
Hoon file stored in the `/ted` directory. Gall agents can ask Spider to run a
thread, then they can subscribe for the result. The thread will do all the I/O
it needs to, and it will either fail or succeed. Either the Gall agent receives
the successful result, or it receives notification of the failure. This allows
all complex I/O to be moved outside of Gall agents, greatly reducing their
complexity.

The old transactional application libraries have been replaced with the
`%spider` agent, and the following new libraries:

- `/lib/strand.hoon` - the new thread system.
- `/lib/strandio.hoon` - a large collection of ready-to-use thread functions.

Since threads are now separate to Gall agents, they can also be run directly
from the Dojo, and provide a useful alternative to Generators as they are able
to interact with Vanes and Gall agents.

## More info

- [Technical overview of Threads](https://urbit.org/docs/userspace/threads/overview)
- [Spider API Reference](https://urbit.org/docs/userspace/threads/reference)
- [Guide to writing and using
  Threads](https://urbit.org/docs/userspace/threads/basics/fundamentals)
- [Pull request on Github](https://github.com/urbit/urbit/pull/1996)
