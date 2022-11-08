+++
title = "Overview"
+++

# Overview

This roadmap describes the plan for making the Urbit OS suitable for mass adoption.  It is a living document, to be updated when milestones are achieved or when plans change.  This overview, intended for nontechnical readers, describes the core team's high-level goals.  Technical readers can also use this document as a starting point for learning more detailed information, such as who is working on what currently, what the next expected projects are, links to specifications, and links to fine-grained project tracking on GitHub.

Here are the high-level goals that need to be achieved to make Urbit a consumer product:
- raise kernel and runtime release frequency to weekly
- develop confidence in security across the board
- manage enough data in the runtime to handle multimedia apps
- approach zero-click maintenance for users
- improve network performance until a ship can handle 100,000 chat subscribers
- make hosting businesses profitable by reducing unit and maintenance costs
- establish backward compatibility for apps

The rest of this document describes the breakdown of these large goals into smaller projects.

## Release Frequency

### Development Work to Increase Release Frequency

Increasing the speed of releases is a high priority, since it will accelerate the pace of development overall.

The first step is to make the upgrade process itself more reliable.  The "agents in Clay" project, slated for the next release as November 2022, rewrites the kernel's upgrade system in a much simpler way, making it much easier to reason about and less fragile.

The next steps involve building support into the kernel for maintaining backward compatibility across kernel upgrades, so that app developers won't need to change their code to keep their apps running on newer kernels.

Later work will likely involve building more extensive testing and telemetry tools to expedite the quality assurance phase of releases.

links TODO:
- upgrade overhaul
- kelvin shims for userspace
- automatic binary upgrades
- logging

### Scale the Team and Processes

The Urbit Foundation and Tlon are both expanding their internal core dev teams.  UF plans to add four full-time core devs over the next year, and Tlon added one recently.  TODO rewrite this sentence

In addition to raw numbers, core dev needs to become more of a traditional open-source project than it has been so far.  This means we need better reference documentation, guides, training, roadmaps, and specifications, especially targeted toward intermediate and advanced developers -- Hoon School has been bringing in a large number of such developers, some of whom should be brought into core development.  Publishing this roadmap represents the core team's first major step toward developing in public, which we plan to increase dramatically.

The architecture of the system will also be examined critically to evaluate points where boundaries can be drawn between subsystems to facilitate their independent development.  Splitting out I/O drivers and event log persistence into their own Unix processes is an example of this kind of thinking. 

Also important for scaling the team is the quality of the testing and release processes.  Tlon has made major strides in the release process this year: their "devstream process" for phased deployment has caught many bugs that would have hit users in previous years.  More automated tests (unit tests, integration tests, and end-to-end "aqua" tests that simulate a fleet of virtual ships inside the Aqua agent) will increase the level of assurance of each deployment, reducing risk and increasing confidence when making a change.

TODO link to jobs page

## Security

Much work remains to bulletproof Urbit to the point where it can not only defend its memory safety and cryptographic safety, but can also fend off denial of service attacks by dedicated assailants.

It is critical to ratchet up the security of the system incrementally to assure we reach our security goals.  Since security is a newly high-priority item for the core team, we will largely do the low-hanging fruit first, to "get in the mood" -- we will then ramp up to the more difficult tasks as we develop more mastery of the domain. 

Securing Urbit breaks down coarsely into securing the software supply chain
("the components, activities, and practices involved in the creation and deployment of software"), mitigation of denial of service attacks, and prevention of penetration (e.g. corrupting memory to hijack the virtual machine).

Urbit security has several dimensions, with tasks ordered within each category in roughly increasing order by level of vulnerability:

- PKI Security:
  - Azimuth PKI contracts: audited, mature
  - JavaScript client security: somewhat mature, but unverified
- Arvo security:
  - Ames cryptosuite: audited, somewhat mature, missing forward secrecy
  - basic kernel security: small attack surface
  - kernel protection against agents: requires userspace permissioning and zapgal type hole closing; otherwise, small attack surface
- Vere security:
  - deserialization ("+cue"): unverified but small
  - jet memory safety: unverified
  - IPC safety: unverified
  - tools (`|meld`, `|pack`, `|mass`, `|trim`) safety: unverified
  - allocator soundness: unverified, somewhat difficult to verify
  - jet dashboard soundness: unverified, difficult to verify
  - bytecode interpreter soundness: unverified, difficult to verify
  - I/O driver security: likely vulnerable, should be split out into subprocesses, maybe rewritten in a memory-safe language
  - dropping Unix process privileges: not implemented
  - encryption at rest for event log and snapshot: not implemented
- Software Supply Chain Security:
  - in-Urbit software distribution: protected by Ames authenticated encryption, but no code signing, so it's vulnerable when redistributed by another ship
  - GitHub repo permissions: established recently
  - infrastructure nodes (live galaxies) permissions: established recently
  - protection against Ethereum node DNS spoofing: none
  - protection against malicious pill or Vere binary distribution: none
  - kernel source code attestation: none
- Denial of Service Protection:
  - Vere packet-level DoS protection: minimal (just basic authenticated encryption)
  - Arvo DoS protection: minimal (just `|ruin`)
  - incident response plan: none
  - telemetry for DoS-related packet statistics: none

(Note that there are also security agenda items for the web client, such as the need to strip EXIF image metadata to prevent geolocation data leak.  These are considered out of scope for this document, which concerns itself only with PKI, kernel, and runtime.)

The deep end of Vere is the most difficult part of the system to secure: allocator, Nock interpreter, and jet dashboard.  The first step toward guaranteeing the security of these components is to simplify their architecture so they can be more effectively analyzed and verified.  

Other tasks can be addressed immediately.  Tlon is developing an incident response plan presently, and basic logging is being developed, which is the first step in DoS protection.  The next step in DoS protection is to validate incoming Ames packets in Vere -- also a high priority.

Splitting out the I/O drivers into their own processes and dropping privileges will add some defense in depth to Vere and increase flexibility of implementation; that work is planned for relatively soon.

The overall story for security is to start raising the bar for security incrementally to be resilient against increasingly determined and well-resourced attackers.

We will first secure the system against an individual or small group intending to casually DoS the network by spamming packets.  Concurrently, we will tighten down intra-Arvo security, since once a basic userspace permissioning system is added and the zapgal type hole is addressed (possibly in a minimal, ad-hoc way), Arvo will be secure against penetration assuming a secure runtime.  Securing Arvo and all its userspace agents against DoS requires more work, and requires interaction with Vere.

Also concurrently with tightening Arvo security and basic DoS protection, incident response plans and basic software supply chain protection are being established.  This entails using best practices for managing permissions to interact with infrastructure nodes (live galaxies and stars), the GitHub repo, and the HTTP endpoints where Vere binaries and pills are distributed, in addition to building protections against DNS spoofing that would allow an attacker to feed a ship bunk PKI data from a fake Ethereum node.

Defending the system against an experienced team determined to find memory corruption in the runtime to gain remote code execution will require the most lead time.  We can start on this soon by improving the quality of the architecture and code in the most critical parts of the runtime; we also plan to experiment with "design for verification", i.e. structuring the code to be amenable to pen-and-paper correctness proofs, so that we can begin preparing the code for external audit and penetration testing.

## Runtime Data Management

There are three main phases to increasing the amount of data the runtime
can manage:
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

## Zero-Click Maintenance

## Network Performance

## Hosting Costs

## Backward Compatibility


