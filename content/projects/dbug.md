+++
title = "Dbug"
date = "2020-01-01"
contributors = ["~palfun-foslup"]
status = "Completed"
+++

The recent release of "static" Gall gave agents a uniform type. This made it
possible to write libraries which can "wrap" agents, adding extra functionality
to any agent. The Dbug agent is one of the first libraries to take this
approach.

Dbug lets you inspect the internal state of a running agent from the Dojo. It
can print the whole state or apply a given hoon expression to produce part of
it. It can also print incoming and outgoing subscriptions. This is very useful
for developers during development, or for users to debug agents on their ship.

## More info

- [Pull request on Github](https://github.com/urbit/urbit/pull/2179)
