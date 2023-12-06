+++
title = "Increase Runtime Data Capacity"
class = "bg-green-400"
+++

There are three main phases to increasing the amount of data the runtime
can manage:
+ use pointer compression to max out the 32-bit allocator
+ improve auxiliary tooling to handle more data than fits in RAM
+ 64-bit or other more experimental increases in data storage

Pointer compression, as detailed more in its own sections, can increase the amount of data stored in Vere by roughly 12x.  It can bring us from a 2GB "loom" (memory arena) to a 16GB loom whose cells are 2/3rds their current size.  This is large enough for effectively unlimited amounts of chat and notebook data, and it should also be enough data for most nodes involved in the Uqbar network, with the possible exception of archive nodes.

The first stage of pointer compression is being worked on currently.  An 8GB loom is in testing and will likely be released within the next couple of runtime releases.

Once there are 8GB or 16GB in the loom, it will be common for there to be more data in Urbit than fits in RAM.  This presents several new problems:

- demand paging (only load nouns into RAM on an as-needed basis, leaving the rest on disk)
- snapshot management (taking an incremental snapshot is more complex)
- tools, such as `|meld`, `|pack`, garbage collection, and deserializing large portable snapshots, will need to be rewritten to do their bookkeeping differently

[Omitted long matching line]

An intermediate approach would be to use a 32-bit arena for cells, direct atoms, and double-pointers to indirect atoms, but then store large (indirect) atoms in a separate 64-bit arena.  When combined with pointer compression, this might be enough data to kick the can down the road for many more years, depending on the common use cases of Urbit.  If Uqbar has millions of accounts in its Merkle tree, this might not be sufficient, but if people just want to store their director's cut edition of Shrek 2, that could be a large atom stored outside the loom, and the loom itself could remain 32-bit.

Building a 64-bit Vere is not an insurmountable project, but the result would almost certainly be significantly slower than the current interpreter, since cache locality is usually the limiting factor in most modern software, and that would be roughly halved by switching from 32-bit to 64-bit.