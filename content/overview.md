+++
title = "Overview"
+++

## Introduction

This roadmap describes the plan for making the Urbit OS suitable for mass adoption.  It is a living document, to be updated when milestones are achieved or when plans change.  This overview, intended for nontechnical readers, describes the core team's high-level goals.  Technical readers can also use this document as a starting point for learning more detailed information, such as who is working on what currently, what the next expected projects are, links to specifications, and links to fine-grained project tracking on GitHub.

Here are the high-level goals that need to be achieved to make Urbit a consumer product:
- [Raise kernel and runtime release frequency to weekly](/#release-frequency)
- [Develop confidence in security across the board](/#security)
- [Manage enough data in the runtime to handle multimedia apps](/#runtime-data-management)
- [Approach zero-click maintenance for users](/#zero-click-maintenance)
- [Improve network performance until a ship can handle 100,000 chat subscribers](/#network-performance)
- [Make hosting businesses profitable by reducing unit and maintenance costs](/#hosting-costs)
- [Establish backward compatibility for apps](/#backward-compatibility)

The rest of this document describes the strategies for achieving these goals.

## Release Frequency

Increasing the speed of releases is the core dev team's highest priority, since it will accelerate the pace of development overall.  We will make a number of changes to the kernel and runtime for this purpose.  Also, the Urbit Foundation and Tlon are both expanding their core dev teams.

### Development Work to Increase Release Frequency

The first step is to make the upgrade process itself more reliable.  The "agents in Clay" project, slated for the next release as November 2022, rewrites the kernel's upgrade system in a much simpler way, making it easier to reason about and less fragile.

Backward compatibility for apps will also increase release frequency for the kernel, so that is being worked on already.  See the [backward compatibility section](/#backward-compatibility) for more detail.  A related project is to automate runtime upgrades to lessen the maintenance burden runtime releases impose on users.

Later work will likely involve building more extensive testing and telemetry tools to expedite the quality assurance phase of releases.

### Scale the Team and Processes

In addition to raw numbers, core dev needs to become more of a traditional open-source project than it has been so far.  This means we need better reference documentation, guides, training, roadmaps, and specifications, especially targeted toward intermediate and advanced developers -- Hoon School has been bringing in a large number of such developers, some of whom should be brought into core development.  Publishing this roadmap represents the core team's first major step toward developing in public, which we plan to increase dramatically.

The architecture of the system will be examined critically to evaluate points where boundaries can be drawn between subsystems to facilitate their independent development.  Splitting out I/O drivers and event log persistence into their own Unix processes is an example of this kind of thinking. 

Also important for scaling the team is the quality of the testing and release processes.  Tlon has made major strides in the release process this year: their "devstream process" for phased deployment has caught many bugs that would have hit users in previous years.  More automated tests (unit tests, integration tests, and end-to-end "aqua" tests that simulate a fleet of virtual ships inside the Aqua agent) will increase the level of assurance of each deployment, reducing risk and increasing confidence when making a change.

### Related Projects

#### Development Work to Increase Release Frequency

- [Upgrade Overhaul ("Agents in Clay")](/project/agents-in-clay)
- [Kelvin Shims for Userspace](/project/shims-old-kelvins)
- [Automatic Binary Upgrades](/project/automatic-binary-upgrades)
- [Logging](/project/logging)

#### Scale the Team and Processes

- [Multiprocess I/O](/project/multiprocess-io)
- [Multiprocess Event Log](/project/multiprocess-event-log)
- [Dropping Privileges](/project/dropping-privileges)
- [Shared Memory IPC](/project/shared-memory-ipc)
- [Improved Vere Build System](/project/vere-build-system)

## Security

Much work remains to bulletproof Urbit to the point where it can not only defend its memory safety and cryptographic safety, but can also fend off denial of service attacks by dedicated assailants.  We will start raising the bar for security incrementally to be resilient against increasingly determined and well-resourced attackers.

Securing Urbit breaks down coarsely into:
- securing the software supply chain ("the components, activities, and practices involved in the creation and deployment of software"),
- mitigating denial of service attacks ("malicious attempts to overwhelm an online service and render it unusable"), and
- preventing penetration (e.g. corrupting memory to hijack the virtual machine).

We will first secure the system against an individual or small group intending to casually DoS the network by spamming packets.  This work will largely consist of many small modifications to process incoming packets more efficiently, improve monitoring and incident response, and ban malicious IP addresses and Urbit ships.

Tlon is developing an incident response plan, and basic logging is being developed, which is the first step in DoS protection.  The next step in DoS protection is to validate incoming Ames packets in Vere -- also a high priority.

Concurrently, we will tighten down intra-Arvo security.  Once two known issues are addressed -- by adding a basic userspace permissioning system and closing a vulnerability known as the "zapgal type hole" -- Arvo should be secure against penetration, assuming a secure runtime.  Mitigating DoS in Arvo and all its userspace agents will require more work, including interaction with Vere.

Along with tightening Arvo security and basic DoS protection, basic software supply chain protection is being established.  This entails using best practices for managing permissions to interact with infrastructure nodes (live galaxies and stars) and places that distribute software, including Urbit's GitHub repository and the HTTP endpoints from which executables -- Vere binaries and "pills" (Nock bootloaders) -- are downloaded.  We will also need to build protections against DNS spoofing that would allow an attacker to feed a ship bunk PKI data from a fake Ethereum node.

Defending the system against an experienced team determined to find memory corruption in the runtime to gain remote code execution will require the most lead time.  We can start on this soon by improving the quality of the architecture and code in the most critical parts of the runtime; we also plan to experiment with "design for verification", i.e. structuring the code to be amenable to pen-and-paper correctness proofs, so that we can begin preparing the code for external audit and penetration testing.

The Nock interpreter (bytecode interpreter, jet dashboard, and allocator) is the most difficult part of the system to secure.  The first step toward guaranteeing its security may be to simplify its architecture so it can be more effectively analyzed and verified.  Splitting out the I/O drivers into their own processes and dropping privileges will add some defense in depth to Vere and increase flexibility of implementation; that work is planned for relatively soon.

Here is a list of security tasks ordered within each category in roughly increasing order by level of vulnerability:

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

#### Related Projects

- [Logging](/project/logging)
- [Validate Ames Packets in Vere](/project/validate-ames-packets-in-vere)
- [Userspace Permissioning](/project/userspace-permissioning)
- [Network DoS Protection](/project/network-dos-protection)
- [Multiprocess IO](/project/multiprocess-io)
- [Zapgal Security](/project/zapgal-security)
- [Outer HMACs on Ames Packets](/project/outer-hmacs)
- [Ames Forward Secrecy Ratchet](/project/forward-secrecy-ratchet)

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

### Related Projects

- [8GB Loom](/project/8gb-loom)
- [Memory-Efficient Meld](/project/memory-efficient-meld)
- [Loom Tool Scaling](/project/loom-tool-scaling)
- [Cell Compression](/project/cell-compression)
- [16GB Loom](/project/16gb-loom)
- [New Mars Snapshot System](/project/new-mars-snapshot)
- [New Mars](/project/new-mars)

## Zero-Click Maintenance

An Urbit ship should maintain itself so that a user does not need to intervene to keep it running properly.  In order for this to be true, the ship needs to be reliable, handle upgrades properly, and manage its resources (e.g. RAM and disk space) efficiently.

### Related Projects

- [Automatic Error Handling on Replay](/project/automatic-error-handling)
- [Fix Ames Bugs](/project/ames-bugs)
- [Automatic Memory Pack/Trim/Meld](/project/automatic-memory-pack)
- [Breadth-First Arvo Move Order](/project/breadth-first-moves)
- [Ames Vane Refactor](/project/refactor-ames-vane)
- [Better Userspace Breach Handling](/project/on-rift)
- [Timer Improvements](/project/timer-improvements)
- [Vere Error Handling Improvements](/project/vere-error-handling)
- [Automatic Binary Upgrades](/project/automatic-binary-upgrades)
- [Versioned Pokes and Subscriptions](/project/versioned-pokes-subscriptions)

## Network Performance

An ordinary Urbit ship needs to be able to host a large chatroom, in addition to other scaling considerations.  The performance of Urbit's networking is the bottleneck limiting this kind of scaling at the moment.

A number of incremental improvements need to be made to the implementation of Ames, Urbit's networking protocol, including fixes for flaky connections and more efficient use of timers.  A second protocol called Fine will also be added for scalable content distribution.  A multi-part project called "subscription reform" will allow apps to use this protocol effectively.

### Related Projects

- [Improved Sponsor Pinging](/project/sponsor-pinging)
- [Tune %clog Constants](/project/tune-clog)
- [Refactor Ames Vane](/project/refactor-ames-vane)
- [Consolidate Packet Re-Send Timers](/project/consolidate-packet-resend)
- [Basic Remote Scry Protocol](/project/remote-scry)
- [Encrypted Remote Scry](/project/encrypted-remote-scry)
- [%pine Query at Latest Protocol](/project/pine-query-at-latest)
- [Network Push Protocol](/project/urth-to-urth)
- ["Nan Madol" (maybe)](/project/nan-madol)
- [Solid-State Publications](/project/solid-state-publications)
- [Symmetric Routing](/project/symmetric-routing)
- [Typed Interface to Solid-State Publications](/project/typed-interface-solid-state-publication)
- [Typed Paths](/project/typed-paths)
- [Commit before Compute](/project/commit-compute)
- [Timer Improvements](/project/timer-improvements)
- [Generalized Deferral Mechanism](/project/generalized-deferral-mechanism)

## Hosting Costs

Running an Urbit hosting company needs to have low enough unit costs per ship to have the possibility of profit.  Some of the costs of hosting have to do with Urbit resource usage, especially RAM.  Other costs stem from maintenance burden and difficulties with supervising Urbit processes from hosting environments.

Demand paging in the runtime promises to reduce RAM usage significantly.  Establishing "quiescence" should also reduce costs, by letting a host move a ship's data out of RAM into disk-based storage when not in use.

### Related Projects

- [Logging](/project/logging)
- [Event Log Truncation](/project/event-log-truncation)
- [Quick Boot](/project/quick-boot)
- [Demand Paging (TODO make listing)](/project/)
- [Memory-Efficient Meld](/project/memory-efficient-meld)
- [Consolidate Packet Re-Send Timers](/project/consolidate-packet-resend)
- [Timer Improvements](/project/timer-improvements)
- [Generalized Deferral Mechanism](/project/generalized-deferral-mechanism)
- [Separate IPC Streams](/project/separate-ipc-streams)
- [Vere Exit Code Scheme](/project/exit-code-scheme)

## Backward Compatibility

As it stands, every Kelvin change breaks backward compatibility, requiring app devs to publish modified code so their users can keep the app running.  This needs to happen less frequently over time, until eventually apps can be "write once, run forever."

The first step is to build scaffolding into the kernel so that compatibility shims can be added when a breaking change is released, so that app developers won't need to change their code to keep their apps running on newer kernels.

Even once it's possible to build a shim to run old apps, not every breaking change will include such a shim -- sometimes we will want to break backward compatibility, either because the shim would be unacceptably complex, or because we need to deprecate an old piece of functionality, especially something insecure or that would get int he way of scaling the network.

Within the next few years, we need to get to the point where future changes never necessitate deprecating old functionality.  This requires stabilizing the interface the kernel presents to applications, so that old features are worth committing to maintaining, and future changes to the interface will be small enough that writing shims is not onerous.

The interface can only be stabilized once a userspace permissioning system has been deployed, since it adds a new security layer, and we don't want to maintain old apps that don't have that security.  Before the interface can stabilize, apps also need an interface for publishing and requesting data to and from other ships that could plausibly be implemented by the kernel in a scalable manner -- the "subscription reform" project aims to provide this scalability.

### Related Projects

- [Upgrade Overhaul ("Agents in Clay")](/project/agents-in-clay)
- [Userspace Permissioning](/project/userspace-permissioning)
- [Shims for Old Kelvins](/project/shims-old-kelvins)
- [Basic Remote Scry Protocol](/project/remote-scry)
- [Encrypted Remote Scry](/project/encrypted-remote-scry)
- [Solid-State Publications](/project/solid-state-publications)
- [Typed Interface to Solid-State Publications](/project/typed-interface-solid-state-publication)
- [Typed Paths](/project/typed-paths)
- [Desk-Based Agent Namespacing](/project/desk-based-namespacing)
- [Clay $care's](/project/clay-cares)
- [Better Userspace Breach Handling](/project/on-rift)
- [Versioned Pokes and Subscriptions](/project/versioned-pokes-and-subscriptions)
- [+mink Stack Trace Determinism](/project/mink-stack-trace-determinism)
- [Zapgal Security](/project/zapgal-security)
