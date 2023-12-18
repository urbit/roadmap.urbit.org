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

At a high level, Ares:

- Increases Urbit's data capacity from 8GB to 16TB
- Initially improves baseline computation speed by 10-100x
- Presents a large surface area for ongoing substantial performance improvements
- Is written in a more mainstream, maintainable language

You can get more detail below, or in the [recent talk from Assembly 2023](https://www.youtube.com/watch?v=dAwCIZa6N9o&t=1s).

## Detail

Ares replaces the "Mars process": one of the two Unix processes that make up Vere, Urbit's current runtime.  The Mars process is responsible for running Urbit's Arvo kernel, and maintaining incremental snapshots of its state.  The other process, called Urth, which manages Urbit's event log and performs input and output, remains untouched by the Ares project.

Ares takes dramatically different strategies from Vere for running Nock and snapshotting state.

The snapshotting system is called the Persistent Memory Arena (PMA).  It uses a specialized data structure called a copy-on-write B-tree to manage up to 16 terabytes of data as a [single-level store](https://en.wikipedia.org/wiki/Single-level_store).  All of this data is available to the Nock code of the Arvo kernel and its userspace applications.  Since most machines don't have 16TB of RAM, the PMA handles "paging" data back and forth between disk and RAM so that only the data being acted upon gets loaded into RAM as needed.  The PMA also ensures that minor changes to the data don't cause the whole arena, potentially multiple terabytes in size, to be rewritten back to disk -- it tracks the changes and writes only those and some bookkeeping data to disk, which is essential for managing that much data.

To run Nock, Ares has a much more elaborate strategy than Vere.  There are two components to the Nock interpreter: "2stackz", a split function call stack that takes the place of a standard stack-and-heap system; and a pipeline of optimizations that transform naive Nock code into a special-purpose low-level language that can be run efficiently on a typical processor.

2stackz consists of two stacks that grow toward each other.  This is an unusual design that takes advantage of the immutability of Nock nouns (Urbit's universal data structure) and the strict "structured programming" control flow discipline of Nock's operational semantics to simplify the traditional stack-and-heap model and enable very fast allocation and freeing of Nock nouns.

Each time a function calls another function, 2stackz pushes a stack frame on the *other* stack.  If function `f` has its stack frame on the west stack and calls `g`, then `g`'s stack frame gets pushed onto the east stack.  When `g` calls `h`, `h`'s stack frame gets pushed onto the west stack, directly on top of `f`'s.

The key to this arrangement is that whenever a function is running, it's free to allocate nouns by extending its own stack frame with the new data, and whenever a function returns, a small copying garbage collector is used to collect the return value.  Both of these operations are cheap.

Putting a noun on top of the current frame requires only one piece of bookkeeping: a field in the stack frame has to be adjusted to store the new, extended edge of the stack frame.  This is called a "bump allocator", and it's a much lower overhead than the vast majority of memory allocators, which often touch multiple parts of memory when allocating.  So allocating space for a new noun in memory is quick.

The overwhelming predominance of nouns allocated during a computation, however, are only used temporarily, after which they become "garbage".  Garbage collection is a major field of computer science, since in the general case, it's isomorphic to the ["bin-packing problem"](https://en.wikipedia.org/wiki/Bin_packing_problem), which is in a set of computationally difficult problems known as NP-hard.  Vere's memory allocator is one of the major pieces of overhead that slow down Nock computation.

By applying the constraints that Nock nouns are immutable and there are no exotic control flow constructs (exceptions, call/cc, etc.), the 2stackz system can perform a simple copying garbage collection step after each function call to copy the return value back to the calling function's stack frame.  This does require a copy operation, but because almost all of the recently allocated nouns are garbage, only a small percentage of them need to be copied.  The best part is that beyond the normal bookkeeping involved in popping a stack frame, freeing the garbage doesn't require any bookkeeping at all: it can just be left on the top of the old stack as control returns to the other stack.

With minimal overhead in both allocating and freeing nouns, noun memory management in Ares promises to be fast indeed.  The last piece of the memory management story is the interaction between 2stackz and the PMA.

When an Arvo event begins, the first 2stackz stack frame is created, containing the new event and the top-level Arvo function call to run the Urbit operating function on the new event.  The state of the Arvo kernel, originally obtained by running previous events, is in the PMA, so even if some of it is only on disk, not in RAM, it still has a valid [virtual memory](https://en.wikipedia.org/wiki/Virtual_memory) address from the host operating system that the host OS will load into RAM on demand.

This means whenever nouns in 2stackz frames refer to the previous Arvo state, they do so by including a pointer to a noun in the PMA.  Because nouns are acyclic, nouns "further in" can only ever point at nouns that are "further out", i.e. further down the stacks or in the PMA.  Only new values need to be stored in the 2stackz; all the files, program state, and compiled Nock code stored persistently in Urbit is kept in the PMA between Arvo events.

Conversely, when an Arvo event finishes and modifications need to be propagated to the PMA, that's the only time the system performs a write to the PMA.  While the event is running, the PMA is idle, and only transient state in 2stackz is modified, by copying the modified data from the last stack frame into the PMA.  Separating transient and ephemeral state in this way helps minimize write amplification in the persistent state, by eliminating writes of transient data that aren't necessary.

Ares' other major departure from Vere is its Nock execution strategy.  In Vere, Nock is first compiled to a custom bytecode, then that bytecode is interpreted.  The bytecode compilation process is relatively naive and does not perform significant transformations of the Nock code.

In contrast, when Ares encounters a new piece of Nock code for the first time, it uses a novel static analysis technique called Subject Knowledge Analysis to calculate the shape of the "subject" tree at each point in the computation.  The Nock subject is the environment that a Nock expression reads from to obtain data.  Because any Nock intended for high performance, including almost all Nock code compiled from Hoon, Urbit's standard higher-level programming language, reads from static locations within that tree, and because Nock's control flow constructs are limited, SKA can obtain rich information that can be used to optimize the code produced by its codegen pipeline.

The next stage in the pipeline is DDCG, destination-driven code generation.  The system converts the subject-analyzed Nock into [basic blocks](https://en.wikipedia.org/wiki/Basic_block).  A basic block is a linear sequence of instructions that always execute in a row, without any conditionals or jumps to other basic blocks except in the basic block's last instruction.

DDCG assembles these blocks by traversing backward in execution order from the end of the computation back to the beginning.  By going backward, the "destination" of each basic block, i.e. any block this block would jump to at the end, has already been generated, enabling the whole assembly to be done efficiently in a single pass, without needing to go back and forth.

These basic blocks also have other optimizations applied during this process: because of the added information from subject knowledge analysis, each intermediate value in the computation is assigned to a [Static Single Assignment](https://en.wikipedia.org/wiki/Static_single-assignment_form) register, which is mapped to a predetermined location within a stack frame in the first version of Ares, and will be mapped to a physical processor register in later versions.

Another major optimization at this stage is jet matching.  Current Vere spends a lot of time at each Nock function call to determine whether it can be replaced by a call to a "jet", i.e. a function built into the interpreter that does the same thing as the Nock but runs faster due to a native implementation, usually written in C or Rust.  For instance, arithmetic operations in Nock are all jetted, since Nock only includes increment and equality checking -- everything else is written using slow recursive algorithms.  By using jets instead, the processor hardware for running arithmetic can be used directly.

Jet matching at runtime during function calls is one of the slowest parts of Vere.  Because of subject knowledge analysis, Ares can perform the necessary checks at compile time, once, and then use their results to generate code that either unconditionally calls the jet without needing to check each time, or unconditionally runs the Nock naively without jetting.

The first version of Ares has a relatively unoptimized interpreter for the result of this DDCG.  A later step will be to condense the DDCG result into an expression in a custom bytecode, and then write an interpreter for that bytecode.  This promises to be a faster approach.  In the long run, since DDCG produces SSA registers, a further speedup could be achieved by switching to compiling Nock all the way to native machine code and having the processor run that directly, instead of interpreting a bytecode.

The goal of the Ares Nock execution project is to demonstrate that while Nock has historically been a slow language, that situation will not persist forever; over time Nock's speed will begin to approach that of native code.

## Code

This project is under heavy active development and can be tracked via it's repository at [urbit/ares](https://github.com/urbit/ares).
