+++
title = "Typed Paths"
arcs = ["Improve Network Performance","Improve Backward Compatibility"]
status = "Completed"
date = "2023-05-09"
contributors = ["~palfun-foslup"]
description = """
Typed paths should improve performance and developer experience, and it could unblock a typed interface to publications.
"""
+++
Typed paths should improve performance and developer experience, and it could unblock a typed interface to publications.

With desk-based namespacing, agents will be using paths all over the place to represent endpoints.  This means parsing and dispatching off paths needs to be something the system does well.  It should be ergonomic, easy to teach to new devs, performant, and standardized.

We've been meaning to change the noun representation of a path for a long time.  Instead of a list of strings, it should be a list of cells with an atom in the tail, tagged with its aura in the head.  We wrote a new type called `$iota`: a tagged union of all the native "auras" (printable atom subtypes) in the tail, tagged by their aura names.  A new path, which we call a "typed path", is a `(list iota)`.

With typed paths, only the outer edges of Arvo ever need to serialize a path to a string to be read by a person, or parse a path from its human-readable string representation into its efficient noun representation.  The inside of the OS will no longer need to serialize and parse the atoms in a list on every context switch, which could be an important performance optimization, to reduce "move overhead", i.e. the amount of time it takes for the kernel to pass a message between Nock programs it's running.

In addition to performance, using typed paths improves developer ergonomics.  To dispatch on a typed path in an incoming request, a dev can write a straightforward `?-` switch statement, without needing to call parsers.  The schema of paths the agent is willing to ingest can even be specified in a type declaration, which could be made legible to the kernel as part of a new userspace/kernelspace interface, enabling later features such as auto-generated user interfaces.  This legibility also gives more flexibility for designing the typed interface to solid-state publications, since those are addressed by path.

- [PR](https://github.com/urbit/urbit/pull/5887)
