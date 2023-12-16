+++
title = "Ares: Initial Release"
arcs = ["Make Urbit Fast"]
start_date = "2022-01-01"
end_date = "2024-02-29"
owner = "~ritpub-sipsyl"
contributors = ["~ritpub-sipsyl", "~finmep-lanteb", "~mastyr-bottec", "~barter-simsum", "~lagrev-nocfep"]
status = "Current"
description = """
Ares is a rewrite of the Nock interpreter for much higher performance and data capacity. 
"""
+++

Ares is a clean-slate rewrite of a large part of Urbit's runtime, intended for much higher performance and data storage capacity.  It is a large project with multiple components.  

At a high level, Ares replaces the "Mars process": one of the two Unix processes that make up Vere, Urbit's current runtime.  The Mars process is responsible for running Urbit's Arvo kernel, and maintaining incremental snapshots of its state.  The other process, called Urth, which Urbit's event log and performs input and output, remains untouched by the Ares project.

Ares takes dramatically different strategies from Vere for running Nock and snapshotting state.

The snapshotting system is called the Persistent Memory Arena (PMA).  It uses a specialized data structure called a copy-on-write B-tree to manage up to 16 terabytes of data as a [single-level store](https://en.wikipedia.org/wiki/Single-level_store).  All of this data is available to the Nock code of the Arvo kernel and its userspace applications.  Since most machines don't have 16TB of RAM, the PMA handles "paging" data back and forth between disk and RAM so that only the data being acted upon gets loaded into RAM as needed.  The PMA also ensures that minor changes to the data don't cause the whole arena, potentially multiple terabytes in size, to be rewritten back to disk -- it tracks the changes and writes only those and some bookkeeping data to disk, which is essential for managing that much data.

To run Nock, Ares has a much more elaborate strategy than Vere.  There are two components to the Nock interpreter: "2stackz", a split function call stack that tkaes the place of a standard stack-and-heap system; and a pipeline of optimizations that transform naive Nock code into a special-purpose low-level language that can be run efficiently on a typical processor.

2stackz consists of two stacks that grow toward each other.  This is an unusual design that takes advantage of the immutability of Nock nouns (Urbit's universal data structure) and the strict "structured programming" control flow discipline of Nock's operational semantics to simplify the traditional stack-and-heap model and enable very fast allocation and freeing of Nock nouns.

Each time a function calls another function, 2stackz pushes a stack frame on the *other* stack.  If function `f` has its stack frame on the west stack and calls `g`, then `g`'s stack frame gets pushed onto the east stack.  When `g` calls `h`, `h`'s stack frame gets pushed onto the west stack, directly on top of `f`'s.

The key to this arrangement is that whenever a function is running, it's free to allocate nouns by extending its own stack frame with the new data, and whenever a function returns, a small copying garbage collector is used to collect the return value.  Both of these operations are cheap.

Putting a noun on top of the current frame requires only one piece of bookkeeping: a field in the stack frame has to be adjusted to store the new, extended edge of the stack frame.  This is called a "bump allocator", and it's a much lower overhead than the vast majority of memory allocators, which often touch multiple parts of memory when allocating.  So allocating space for a new noun in memory is quick.

The overwhelming predominance of nouns allocated during a computation, however, are only used temporarily, after which they become "garbage".  Garbage collection is a major field of computer science, since in the general case, it's isomorphic to the ["bin-packing problem"](https://en.wikipedia.org/wiki/Bin_packing_problem), which is in a set of computationally difficult problems known as NP-hard.

TODO: finish description of 2stackz function returns
TODO: add description of the transformataion pipeline, including subject knowledge analysis, destination-driven code generation, the codegen interpreter, and the bytecode interpreter

Talk: https://www.youtube.com/watch?v=dAwCIZa6N9o&t=1s