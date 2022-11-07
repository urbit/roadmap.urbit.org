# Current Projects

Despite the short-term focus on security, progress must also continue on other high-level goals.

## Solid-State Publications

For scalability, basic solid-state publications are being prototyped.  This is the next step after basic remote scry toward scalable data publishing on Urbit.  These prototypes live in userspace; once we've proven the model with some real-world examples, we can build kernel support into Gall.

## Quick Boot

The "quick boot" project aims to bring initial Urbit boot time down from ~10 minutes to well under a minute.  This is short enough to make a material impact on adoption, since if a user gets bored while waiting for a ship to boot, they're much more likely to forget about it and never complete the onboarding.  This is useful for hosting providers, CI testing, and developer experience.  It has been worked on for a few months, and the first few steps are complete.  One of the last steps, now written and in the testing phase (https://github.com/urbit/urbit/pull/6044), is to make Ford caches portable between ships.

## Store More Data

TODO: separate long-form description into "arc" page?

Increasing the amount of data the runtime can manage is another important goal that can't be neglected.  There are three main phases to the plan for this:
+ use pointer compression to max out the 32-bit allocator
+ improve auxiliary tooling to handle more data than fits in RAM
+ 64-bit or other more experimental increases in data storage

### Pointer Compression

Pointer compression, as detailed more in its own sections, can increase the amount of data stored in Vere by roughly 12x.  It can bring us from a 2GB "loom" (memory arena) to a 16GB loom whose cells are 2/3rds their current size.  This is large enough for effectively unlimited amounts of chat and notebook data, and it should also be enough data for most nodes involved in the Uqbar network, with the possible exception of archive nodes.

The first stage of pointer compression is being worked on currently.  An 8GB loom is in testing and will likely be released within the next couple of runtime releases.

Once there are 8GB or 16GB in the loom, it will be common for there to be more data in Urbit than fits in RAM.  This presents several new problems:
- demand paging (only load nouns into RAM on an as-needed basis, leaving the rest on disk)
- snapshot management (taking an incremental snapshot is more complex)
- tools, such as `|meld`, `|pack`, garbage collection, and deserializing large portable snapshots, will need to be rewritten to do their bookkeeping differently

### Tool Scaling

Only once these tools can scale up to larger-than-RAM data can the system effectively use more than 16GB of memory, so that is when switching to a 64-bit interpreter might make sense -- managing a large Arvo snapshot means a lot more than just addressing the memory.  By the time the first two phases are complete, New Mars might be ready.  Since New Mars is a 64-bit interpreter, it might make sense not to build a 64-bit version of Vere at all; if New Mars is not yet ready, then a 64-bit Vere would make more sense.

### Separate Arena for Large Atoms

An intermediate approach would be to use a 32-bit arena for cells, direct atoms, and double-pointers to indirect atoms, but then store large (indirect) atoms in a separate 64-bit arena.  When combined with pointer compression, this might be enough data to kick the can down the road for many more years, depending on the common use cases of Urbit.  If Uqbar has millions of accounts in its Merkle tree, this might not be sufficient, but if people just want to store their director's cut edition of Shrek 2, that could be a large atom stored outside the loom, and the loom itself could remain 32-bit.

### 64-Bit Vere

Building a 64-bit Vere is not an insurmountable project, but the result would almost certainly be significantly slower than the current interpreter, since cache locality is usually the limiting factor in most modern software, and that would be roughly halved by switching from 32-bit to 64-bit.

## Reduce `|meld` Memory Use

Reducing `|meld` memory use is being worked on.  For many users, `|meld` is unusable, since they don't have swap space set up on the machine they use to run their ships and it can use enough memory to kill the Urbit process.  For users whose looms are almost full, this issue can prevent them from running their ships at all, so fixing it is an important step toward zero-click maintenance.

## Improve Vere Build System

The build system for Vere has been the source of many headaches for years.  Experiments are being conducted to extract Vere from the monorepo into its own git repository and replace the current Nix build setup with a new one based on the Bazel build system.  If successful, these experiments could greatly reduce the amount of friction involved in Vere development, CI testing, and deployment, increasing the rate of development and releases.

## New Mars

New Mars is an experimental rewrite of the Nock interpreter, including its own noun allocator, Nock -> machine code compiler, and incremental snapshot architecture.  New Mars also includes a new Nock static analysis system called "subject knowledge analysis", which has the potential to increase general Nock performance and also to streamline the jet dashboard (the system that checks whether a jet can be run instead of Nock), which is one of the most complex subsystems in current Vere.

Part of New Mars's snapshot architecture has already been backported to Vere.  We expect more of that research, possibly including subject knowledge analysis, to be amenable to backporting, increasing the short-term payoff of this long-term project and likely easing later integration.

## Kelvin Shims for Old Userspace

TODO: link to project listing for this

## Doccords

The "doccords" project is also almost done.  This adds docstrings, a common programming language feature, to Hoon, which should aid especially new Hoon programmers in learning the system more easily.
