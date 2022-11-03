+++
title = "Overview"
+++

Urbit has been in development for over a decade.  Most of that time has been spent on building the first or second versions of each major component, often as little more than a prototype.  Only in the last year has the system matured enough for us to be able to enumerate the remaining blockers to mass adoption.

Over the next year or two, the Urbit core devs are focused on making the Urbit OS a fully featured, bulletproof, easy-to-use consumer product.  This roadmap is intended to clarify how the core devs plan to accomplish this task, in as much detail as possible.

I want the members of the broader Urbit ecosystem to understand what needs to be done, how each piece will be built and why, a rough timeline of what to expect when, and ideally how they can help accelerate development.

The plan is of course subject to change, but I expect our orientation to be stable.  Here are the high-level tasks that need to be done to make Urbit a consumer product:
- solidify the interface between applications and the kernel
- manage larger amounts of data in the runtime
- security: runtime hardening and userspace permissioning
- network scaling: new high-bandwidth read protocols, better routing
- developer experience, e.g. dependency management
- zero-click maintenance: better upgrades and error handling
- better cloud hosting support: quiescence, lower memory footprint

The rest of this document describes the breakdown of these large tasks into smaller projects.

## Strategy and Timing

The core devs have a three-phase plan:
- clear the backlog
- prioritize new projects according to strategic objectives
- scale the team and processes

### Clear the Backlog

The highest priority for the core team is to release a number of kernel and runtime projects that are in a completed or nearly completed state.  Some of these projects had to be shelved due to the need to fix some severe user-facing issues.  In addition to feature work, a large portion of dev time in 2022 was spent reducing kernel memory use and fixing bugs.

On the memory use front, "tombstoning" was added to Clay to allow files to be deleted, freeing their memory.  Clay stopped storing diffs to files, switching to storing only snapshots of files.  The Ford cache was made referentially transparent, enabling global deduplication of memory for Ford builds across multiple app desks.  Space leaks in Ford where Clay state leaked into build results were plugged.

As for bug fixing, the "gall request queue fix", which involved major changes to Ames and Gall and a complex online migration, was the largest bugfixing project.  Fixes were also deployed for Ames breach handling, Behn timers getting stuck, insecure "bail: meme" out-of-memory error handling, and stuck Azimuth PKI tracking.

Early in the year, bugs were identified in Arvo's upgrade system that have made pushing out new releases risky.  As of the latest release, those bugs no longer brick users' ships, but they can still erroneously turn off apps that should be running, requiring manual user attention to resolve.  The "agents-in-Clay" project addresses these bugs by greatly simplifying the upgrade system, making its correctness much easier to verify.

Here is the specification for the agents-in-Clay work (slightly out of date):
https://gist.github.com/belisarius222/2ae74bfb5a40860b59d28970d29b3329

The agents-in-Clay work is now nearing completion (the first version, without migration waypoints).  Once it's deployed, release frequency for the kernel and runtime can increase.  Projects blocked on this release include the basic remote scry protocol and userspace permissioning.

In parallel, a major update to the runtime is also approaching release: "event log truncation".  This is a basic feature of "prevalence systems" such as Urbit's, to ensure disk usage stays roughly constant over time instead of increasing linearly as it does now.

Implementing event log truncation required first moving the responsibility for managing the event log from Vere's "Urth" I/O process to its "Mars" Nock worker process, colocating event log persistence with snapshot persistence to ensure consistency when deleting old events from the log.

`~palfun-foslup`'s improvements to the terminal subsystems, having languished unreleased for many months, are slated for the next release after event log truncation and agents-in-Clay.

### Strategic Objectives

#### Security

Of the high-level tasks listed in the overview above, the highest priority for now is security.  Fully securing Urbit to the point where it is a bulletproof system that can not only defend its memory safety and cryptographic safety, but can also fend off denial of service attacks by dedicated assailants, will take years.

It is critical for the core dev team to have an incremental plan to ratchet up the security of the system piece by piece to assure we reach our security goals.  Since security is a newly high-priority item for the core team, we will largely do the low-hanging fruit first, to "get in the mood" -- we will then ramp up to the more difficult tasks as we develop more mastery of the domain. 

Urbit security has several dimensions, with tasks ordered within each category in roughly increasing order by level of vulnerability:

- PKI Security:
  - Azimuth PKI contracts: audited, mature
  - JavaScript client security: somewhat mature, but unverified
- Arvo security:
  - Ames cryptosuite: audited, somewhat mature, missing forward secrecy
  - basic kernel security: no known flaws, small attack surface
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
  - dropping Unix process privileges: not done
  - encryption at rest for event log and snapshot: not implemented
- Software Supply Chain Security:
  - in-Urbit software distribution: protected by Ames authenticated encryption
  - GitHub repo permissions: established
  - infrastructure nodes (live galaxies) permissions: established
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

Also concurrently with tightening Arvo security and basic DoS protection, incident response plans and basic software supply chain protection are being established.  This entails using best practices for managing permissions to interact with infrastructure nodes (live galaxiesand stars), the GitHub repo, and the HTTP endpoints where Vere binaries and pills are distributed, in addition to building protections against DNS spoofing that would allow an attacker to feed a ship bunk PKI data from a fake Ethereum node.

Defending the system against an experienced team determined to find memory corruption in the runtime to gain remote code execution will require the most lead time.  We can start on this soon by improving the quality of the architecture and code in the most critical parts of the runtime; we also plan to experiment with "design for verification", i.e. structuring the code to be amenable to pen-and-paper correctness proofs, so that we can begin preparing the code for external audit and penetration testing.

#### Other Strategic Priorities

##### Current Projects

Despite the short-term focus on security, progress must also continue on other high-level goals.  For scalability, basic solid-state publications are being prototyped.  This is the next step after basic remote scry toward scalable data publishing on Urbit.  These prototypes live in userspace; once we've proven the model with some real-world examples, we can build kernel support into Gall.

The "quick boot" project aims to bring initial Urbit boot time down from ~10 minutes to well under a minute.  This is short enough to make a material impact on adoption, since if a user gets bored while waiting for a ship to boot, they're much more likely to forget about it and never complete the onboarding.  This is useful for hosting providers, CI testing, and developer experience.  It has been worked on for a few months, and the first few steps are complete.  One of the last steps, now written and in the testing phase (https://github.com/urbit/urbit/pull/6044), is to make Ford caches portable between ships.

Increasing the amount of data the runtime can manage is another important goal that can't be neglected.  There are three main phases to the plan for this:
+ use pointer compression to max out the 32-bit allocator
+ improve auxiliary tooling to handle more data than fits in RAM
+ 64-bit or other more experimental increases in data storage

Pointer compression, as detailed more in its own sections, can increase the amount of data stored in Vere by roughly 12x.  It can bring us from a 2GB "loom" (memory arena) to a 16GB loom whose cells are 2/3rds their current size.  This is large enough for effectively unlimited amounts of chat and notebook data, and it should also be enough data for most nodes involved in the Uqbar network, with the possible exception of archive nodes.

The first stage of pointer compression is being worked on currently.  An 8GB loom is in testing and will likely be released within the next couple of runtime releases.

Once there are 8GB or 16GB in the loom, it will be common for there to be more data in Urbit than fits in RAM.  This presents several new problems:
- demand paging (only load nouns into RAM on an as-needed basis, leaving the rest on disk)
- snapshot management (taking an incremental snapshot is more complex)
- tools, such as `|meld`, `|pack`, garbage collection, and deserializing large portable snapshots, will need to be rewritten to do their bookkeeping differently

Only once these tools can scale up to larger-than-RAM data can the system effectively use more than 16GB of memory, so that is when switching to a 64-bit interpreter might make sense -- managing a large Arvo snapshot means a lot more than just addressing the memory.  By the time the first two phases are complete, New Mars might be ready.  Since New Mars is a 64-bit interpreter, it might make sense not to build a 64-bit version of Vere at all; if New Mars is not yet ready, then a 64-bit Vere would make more sense.

Building a 64-bit Vere is not an insurmountable project, but the result would almost certainly be significantly slower than the current interpreter, since cache locality is usually the limiting factor in most modern software, and that would be roughly halved by switching from 32-bit to 64-bit.

It should also be noted that an intermediate approach would be to use a 32-bit arena for cells, direct atoms, and double-pointers to indirect atoms, but then store large (indirect) atoms in a separate 64-bit arena.  When combined with pointer compression, this might be enough data to kick the can down the road for many more years, depending on the common use cases of Urbit.  If Uqbar has millions of accounts in its Merkle tree, this might not be sufficient, but if people just want to store their director's cut edition of Shrek 2, that could be a large atom stored outside the loom, and the loom itself could remain 32-bit.

Reducing `|meld` memory use is being worked on.  For many users, `|meld` is unusable, since they don't have swap space set up on the machine they use to run their ships and it can use enough memory to kill the Urbit process.  For users whose looms are almost full, this can prevent them from running their ships at all, so this is an important step toward zero-click maintenance.

The build system for Vere has been the source of many headaches for years.  Experiments are being conducted to extract Vere from the monorepo into its own git repository and replace the current Nix build setup with a new one based on the Bazel build system.  If successful, these experiments could greatly reduce the amount of friction involved in Vere development, CI testing, and deployment, increasing the rate of development and releases.

New Mars is an experimental rewrite of the Nock interpreter, including its own noun allocator, Nock -> machine code compiler, and incremental snapshot architecture.  New Mars also includes a new Nock static analysis system called "subject knowledge analysis", which has the potential to increase general Nock performance and also to streamline the jet dashboard (the system that checks whether a jet can be run instead of Nock), which is one of the most complex subsystems in current Vere.

Part of New Mars's snapshot architecture has already been backported to Vere.  We expect more of that research, possibly including subject knowledge analysis, to be amenable to backporting, increasing the short-term payoff of this long-term project and likely easing later integration.

The "doccords" project is also almost done.  This adds docstrings, a common programming language feature, to Hoon, which should aid especially new Hoon programmers in learning the system more easily.

##### Next Projects

After all the current projects are released, some projects are next up.

One of these is breadth-first move order in Arvo.  This intends to improve the reliability of parts of the kernel, including upgrades and breach handling, by modifying the order in which Arvo dispatches moves to vanes: https://github.com/urbit/urbit/pull/6041

The basic remote scry protocol is also on the docket, needing only some more review and testing before release.

A bug in the "gall request queue fix" work is an occasional crash with the error message "ack crashed exit".  This is high priority to fix, while the GRQF project is still fresh in people's minds.  It is likely a relatively small project.

One thing we can do to begin protecting against DoS is to validate packets in Vere before injecting them as Arvo events.  This will make it harder for an attacker to lock up a victim's event loop, and it should be a straightforward project.

Experimenting with different designs for the jet dashboard is also high priority, since it could improve performance, security, and general simplicity of the codebase.  Backporting New Mars's "subject knowledge analysis" to Vere is worth trying, for similar reasons.

### Scale the Team and Processes

The first step in scaling the core dev team is to hire more devs.  The Urbit Foundation and Tlon are both expanding their internal dev teams.  UF plans to add four full-time core devs over the next year, and Tlon added one recently.

In addition to raw numbers, core dev needs to become more of a traditional open-source project than it has been so far.  This means we need better reference documentation, guides, training, roadmaps, and specifications, especially targeted toward intermediate and advanced developers -- Hoon School has been bringing in a large number of such developers, some of whom should be brought into core development.  Publishing this roadmap represents the core team's first major step toward developing in public, which we plan to increase dramatically.

The architecture of the system will also be examined critically to evaluate points where boundaries can be drawn between subsystems to facilitate their independent development.  Splitting out I/O drivers and event log persistence into their own Unix processes is an example of this kind of thinking. 

Also important for scaling the team is the quality of the testing and release processes.  Tlon has made major strides in the release process this year: their "devstream process" for phased deployment has caught many bugs that would have hit users in previous years.  More automated tests (unit tests, integration tests, and end-to-end "aqua" tests that simulate a fleet of virtual ships inside the Aqua agent) will increase the level of assurance of each deployment, reducing risk and increasing confidence when making a change.

## Project Listing

### Current Projects

- upgrade overhaul ("agents in clay")
- userspace permissions
- doccords
- quick boot (requires portable ford caches)
- runtime build system improvements (monorepo, bazel)
- logging
- event log truncation
- pointer compression
- |meld memory use
- solid-state subscriptions in userspace
- New Mars

### Next Projects

- breadth-first move order (TODO write up)
- remote scry
- fix "ack crashed exit" in Ames
- validate packets in Vere for DDoS protection
- jet dashboard experiments
- terminal improvements
- backport "subject knowledge analysis" from New Mars to Vere

### Future Projects

- Arvo
  - userspace/kernelspace interface
    - basic solid-state publications
    - typed publication interface
      - dynamic gall redux
      - turn off zapgal (`!<`)
      - typed paths and path pattern syntax
    - userspace permissions
      - basic permissions
      - scry permissions (integrate with encrypted remote scry)
    - desk-based agent namespacing
    - versioned pokes and subscriptions
  - developer experience
    - cross-desk dependencies
    - atomic cross-desk updates for kelvins
    - dependent hoon demo
    - clean up Clay `$care`s
    - shims for userspace code at old kelvins
    - `+on-rift` or similar for userspace to handle breaches
    - more revision control tools? (i.e. what do we need to get off github?)
  - networking
    - consolidate packet re-send timers (toward quiescence)
    - improve sponsor pinging
    - tune `%clog` backpressure time and space constants
    - encrypted remote scry
    - refactor Ames vane
      - finger trees for packet queues
      - use `+abet` pattern
- Vere
  - event log truncation
  - shared memory ipc
  - Separating IPC Streams
  - commit before compute log
  - pointer compression
  - >16G loom (new allocator)
  - exit code scheme for mars, clear and actionable messages for them in urth
  - vere error handling (no more assert(0))
  - "new mars" snapshot design (more efficient loom)
  - dropping privileges
  - multiprocess i/o
  - multiprocess event-log?
  - automatic binary upgrades
  - automatic event log truncation
  - automatic error handling on replay (cf meld)
  - memory-efficient meld
  - network dos protection
  - automatic memory pack/trim/meld &c (at least better heuristics)
  - multi-session terminal
  - logging
  - %clay sync error handling
  - urth-to-urth network push sessions
  - IP filtering for DDoS protection
  - outer HMACs on packets for DDoS protection (maybe)
  - libames
- Vere/Arvo cross-cutting projects
  - add remote scry network protocol
  - HTTP scrying
  - HTTP mutable URL caching
  - better arvo/vere version negotiation (flexibility, zuse/arvo compatibility ranges)
  - jet dashboard design research
  - arvo/vere error handling
  - timer improvements (errors, efficiency, separate flows, quiescence, &c)
  - generalized deferral mechanism
  - +mink stack trace determinism
  - .^ (interpreter challenges, hoon ergonomics)
  - terminal improvements
  - symmetric routing
  - forward secrecy ratchet in Ames
  - add `%pine` query-at-latest protocol
  - Nan Madol Urth-to-Urth custom protocol (maybe)
  - native UI research

## Arvo Projects

Within the next two years, I want us to have a stable interface between applications and the kernel.  The big things missing from this right now are permissioning and solid-state publications.  Once we have those two things, we can focus on improving the ergonomics of this API for developer experience.

### Userspace Permissioning

Kernel and applications are both unprotected against malicious applications until userspace permissioning is added.

The idea of permissioning is relatively straightforward: the kernel should protect itself from applications, and it should protect applications from each other.  This is similar to the iOS app permissioning system, with some differences because Urbit is a server and not all applications are interactive -- some are more like background services.

`~palfun-foslup` is working on this now.  While the basic concept is relatively simple, implementing permissions in a way that preserves invariants correctly across upgrades and doesn't confuse the user requires careful thought and probably some iteration.  Permissions for scry also might require multiple tries to get right, and we likely won't know until we have some experience working with encrypted remote scry.

### Solid-State Publications

We expect solid-state publications to unblock the content distribution scaling bottleneck by letting applications distribute large amounts of data to many other ships efficiently without excessive load on the publisher ship.

Solid-state publications involve more changes to the system.  This project is also called "subscription reform", since it will reform Gall's idea of a subscription.  The basic idea is to let applications publish data into Urbit's "scry namespace".  This will allow for scalable reads of that data using the upcoming remote scry protocol.  It should also improve the developer experience by making it easier to write a pub-sub system in an application that is both reliable and scalable.

A solid-state publication is a state replication system.  The publishing application makes a piece of mutable state accessible at a subscription path -- such as a list of blog posts at `/~sampel-palnet/blog`.  The solid-state publication system then ensures that every subscriber has the same (i.e. noun-equal) state as the publisher.

The mechanism for synchronizing the state from publisher to subscribers is a shared event-log & snapshot system.  Each subscriber downloads a snapshot of the state when it first subscribes.  It then requests the next diff from the publisher.  When it receives this diff, it applies the diff to the snapshot to arrive at the next state.  It repeats this diff application until it's arrived at the most recent state.  Then the subscriber requests the next diff from the publisher -- this blocks until the new diff has been published, at which point Gall applies the diff the same way.

The steady-state operation of a solid-state publication, after a subscriber has finished initial synchronization, looks like this:
- publisher agent emits diff to Gall
- publisher Gall applies diff to publication, resulting in new publication state
- publisher Gall sends diff over the network to subscribers
- subscriber Gall receives diff over the network
- subscriber Gall applies diff to subscription, arriving at new publication state
- subscriber Gall notifiees subscriber agent with publication state and diff

Since snapshots will eventually be fetched using the remote scry protocol, the application should only store snapshots occasionally, and ideally on a fixed schedule, such as once every 100 diffs.  That way many subscribers joining within a short amount of time will download the same snapshot, and most of those download requests can be served by the runtime's scry cache without running Nock.

This system will eventually replace Gall's current `%watch` subscription mechanism.  For a while before that, both will be supported.  Not all of the solid-state publication submodules have been fully spec'd out yet, but many of them have.  Several changes to networking need to be made to support solid-state publications fully, and the userspace/kernelspace interface will need to change.

The first versions of solid-state publications will use Ames.  Once a basic remote scry protocol is added, public solid-state publications could use it for downloading snapshots, and applications like blogging that don't need low latency could usee it for downloading diffs too.  Latency-sensitive applications will need to download diffs over Ames until the "network push protocol" is added to reduce latency.  Using solid-state publications for private data requires encrypted remote scry, which encrypts scry paths and their values before sending them over the network.  Finally, a subscriber's initial request to find the latest revision number of a publication will use Ames until the `%pine` network protocol is added to take over that responsibility.

Applications will need to be able to to emit new kinds of requests to Gall to ask Gall to publish or subscribe to a solid-state publication, and Gall will need to deliver new kinds of events into subscriber applications to notify them that a new diff has been applied.

Some more descriptions of solid-state publications:
https://gist.github.com/belisarius222/0b53d59014a0a1b507363474a2dbe0ae
https://github.com/urbit/plan/blob/master/oort/infra-offsite/chat-scry.txt

#### Typed Interface to Solid-State Publications

A typed interface to solid-state publications should improve developer experience and performance (by avoiding runtime typechecks and type coercions).

For ergonomics, Gall should also keep applications supplied with typed, synchronous access to both published and subscribed data.  In order for this to work seamlessly, Gall needs to keep this data in scope for a Gall application -- in other words, the data needs to be injected into the application's subject, just like the `$bowl` of event-specific data that Gall normally injects, which contains the current ship, date, entropy, etc.

Unlike the `$bowl`, however, the Hoon type of the state in a solid-state publication varies by publication type.  Each publication type will be defined using a "mark definition", just like a Clay filetype.  This mark definition will specify the type of the state, type of the diff, and a function that applies a diff to a state to obtain the new state.  Both publisher and subscriber Galls will run this function to keep their states up to date when the publishing application emits a new diff.

Because each publication type has its own Hoon type and each application will have a different set of types of publications and subscriptions, each application needs to have its own Hoon type.  This is different from the current "static" Gall, in which all applications have type `$agent:gall`.  Old "dynamic" Gall did have this property, though.

Old dynamic Gall was hard to work with and teach to new developers.  There is a risk that switching back to a dynamic Gall will make it harder to work with.  Our curent position is that we can mitigate these problems by maintaining three positive properties of new Gall that old Gall did not have:
- support for agent-to-agent transformer libraries, such as `+dbug`, `+verb`, and `+shoe`
- same set of arms for every agent, or at least the same set of required arms
- a "default agent" library can be used to stub out arms with default behavior
- there is a type definition in the standard library that a dev can read to understand which arms are required and their types, and the developer can get an easily understood compile-time type error if their agent fails to typecheck

Every agent in dynamic Gall has a different type, but a parameterized type could be expressive enough to describe all agents.  It would describe a core with a fixed set of arms, but whose internal type, input and output types, and pub/sub types are type parameters that vary by agent.

#### Zapgal Security

Turning off the `!<` ("zapgal") rune in userspace will reduce the security attack surface of the kernel, reducing the kernel's vulnerability to attack by malicious applications.

An issue with the current Gall is that it encourages applications to use the unsafe `!<` ("zapgal") rune.  This rune allows an application to emit data to the kernel that the kernel thinks has a certain type, but which actually has a different type.  This is theoretically possible for the kernel to defend against, but needing to safely ingest maliciously typed data from userspace would significantly increase the security attack surface area of the kernel.

There are two ways this could be addressed: either the Hoon type system could be extended to propagate type correctness proofs for `$vase`s (a pair of a noun's type and value, representing a dynamically typed value), which would close the type hole in `!<` and make it safe; or the kernel can disallow `!<` in userspace code.

TODO there are two different versions of the opaque vases: just vases, or more general opaque types; if it's just vases, that's quite doable by turning +slop and +slap into runes and changing the Biblicals system

We often refer to the first option as "safe vases" or "opaque vases", since the type system feature required to know that a vase is safe is known as "opaque types".  Many type systems have this feature, but building it in Urbit poses unique difficulties because Urbit loads code for applications from multiple security domains, meaning the type proofs would need to extend across those domains -- this is almost certainly tractable, but it is a harder problem than whole-program compilation systemslike GHC, so it's not clear that the added complexity is worth it, and its novelty implies risk of development timeline slippage.

If `!<` is not allowed, we will in practice need a dynamic Gall again, even without solid-state publications -- otherwise, an application will need to traverse each noun it receives to validate ("clam") it, introducing a performance regression.  The kernel will run each application "in vase mode", i.e. dynamically typed.  It will perform runtime typechecks on the effects those applications emit, with a memoization cache for the typechecks -- this is how Arvo runs vanes, and it's how old Gall ran applications.

Our current plan is to build dynamic Gall and turn off `!<` in userspace, but it should be noted that we have not made a firm decision not to eventually build opaque vases too.

### Desk-Based Namespacing

Desk-based namespacing should improve reliability, maintenance, and developer experience.

Desk-based namespacing will fix a name collision issue with Gall agents.  We also expect it to improve developer ergonomics by bringing the system slightly closer to a "server-side components system".

Each Urbit "app" a user installs is a "desk" (i.e. self-contained filesystem snapshot) that generally contains source for several Gall "agents", each of which is a long-running stateful service.  When an agent communicates with another agent, it uses the other agent's name (and the ship it's running on).

The agent's name is just a simple string, like 'dojo', that does not include the desk name.  If the user tries to install a new app desk containing an agent with the same name as the agent on another desk, there is now a conflict -- if the kernel installed the new desk too, it would not be able to keep both agents with the same name running.  Right now, last-installed wins, which has caused numerous support problems, mostly due to developers accidentally including extra agents in their app desks that end up usurping the original agents.

With this flat namespace for agent names, there's no good way to prevent conflicts.  The more apps get published, the more likely some of them will contain agents whose names collide.  The agents within a desk are implementation details of the application, so it's frustrating for a user to be presented with an incompatibility that's apparently due to some abstruse technical problem -- exactly the sort of thing Urbit purports to prevent.

The way we plan to fix this is for agents to send messages to a ship and path, instead of a ship and agent name.  This path will look like `/[desk]/[agent]/rest/of/path`.  The 'foo' agent on desk 'a' will be addressable at a disjoint set of paths from the set exposed by another 'foo' agent on desk 'b'.  The kernel can run both simultaneously with no conflicts or ambiguities, so the user can seamlessly run both apps.

There is still the potential of conflicts between desk names, but that's less likely since there are fewer desks than agents, accidental name collisions can be more easily avoided, and in the case of a conflict the user could be presented with a dialog box saying "you already have an app named 'such-and-such' -- do you want to keep the old one or replace it?", which is simpler.

Communicating with an agent at a whole path rather than a single string makes the set of agents within a desk more clearly an implementation detail, since a path as public endpoint doesn't expose which agents are running.  `/foo/bar/baz` could be an agent defined at `/bar/baz` within the `foo` desk, or the subpath `/baz` exposed by the agent 'bar'.

This design also preserves an important part of Urbit that would be easy to lose: application developers don't usually have to build "service discovery layers".  Most agents hard-code the agent names for the other agents they communicate with.  With desk-based namespacing, these agents will hard-code the desk and agent name.

There will likely be complications from this change, including in Dojo syntax and userspace permissioning, that make integration nontrivial.

### Typed Paths

Typed paths should improve performance and developer experience, and it could unblock a typed interface to publications.

With desk-based namespacing, agents will be using paths all over the place to represent endpoints.  This means parsing and dispatching off paths needs to be something the system does well.  It should be ergonomic, easy to teach to new devs, performant, and standardized.

We've been meaning to change the noun representation of a path for a long time.  Instead of a list of strings, it should be a list of cells with an atom in the tail, tagged with its aura in the head.  We wrote a new type called `$iota`: a tagged union of all the native "auras" (printable atom subtypes) in the tail, tagged by their aura names.  A new path, which we call a "typed path", is a `(list iota)`.

With typed paths, only the outer edges of Arvo ever need to serialize a path to a string to be read by a person, or parse a path from its human-readable string representation into its efficient noun representation.  The inside of the OS will no longer need to serialize and parse the atoms in a list on every context switch, which could be an important performance optimization, to reduce "move overhead", i.e. the amount of time it takes for the kernel to pass a message between Nock programs it's running.

In addition to performance, using typed paths improves developer ergonomics.  To dispatch on a typed path in an incoming request, a dev can write a straightforward `?-` switch statement, without needing to call parsers.  The schema of paths the agent is willing to ingest can even be specified in a type declaration, which could be made legible to the kernel as part of a new userspace/kernelspace interface, enabling later features such as auto-generated user interfaces.  This legibility also gives more flexibility for designing the typed interface to solid-state publications, since those are addressed by path.

`~palfun-foslup` has already implemented typed paths and pattern-matching syntax for them, but it hasn't been integrated or deployed yet.

Code:
https://github.com/urbit/urbit/pull/5887

### Versioned Pokes and Subscriptions

Standardizing application protocol versioning in the kernel should improve developer experience and lead to more applications behaving correctly across upgrades, thereby improving user experience too.

Urbit applications have a more difficult versioning problem to solve than traditional centralized applications: the dev can't just turn off the servers and reboot them all with the new version.  Instead, any given user ship might or might not update its installation of this application -- and some ships might decide never to update.

For an Urbit application to provide a good user experience across upgrades, it needs to have good answers for all four squares of the compatibility matrix:
Easy:
- new publisher -> new subscriber
- old publisher -> old subscriber
Hard:
- new publisher -> old subscriber
- old publisher -> new subscriber

Tlon's Landscape suite was the first set of applications to establish development patterns to handle this versioning reliably.  The push and pull hook libraries embed this pattern, among other features.  The general answer is to add a version number to each publication and perform an explicit version negotiation to determine the latest version that both sides understand.

Instead of the push and pull hook libraries, the kernel should handle this version negotiation for applications.  The developer should only need to write a couple of migration functions describing the application-specific parts of the upgrade, and the kernel will handle the version negotiation.

A spec for versioned subscriptions can be found here:
https://github.com/urbit/plan/blob/master/oort/infra-offsite/versioned-marks.txt

## Developer Experience

There are a number of work items primarily geared toward developer experience.

### Cross-Desk Dependencies

This is implemented by `%herd`, which is a dependency management system, currently built into the Citadel app, that allows a userspace dev to combine libraries from multiple desks into an app desk that can be published to users.

### Atomic Cross-Desk Updates for Kelvins

This is part of the 'agents-in-clay' work -- make sure all userspace desks update in the same Arvo event as a Kelvin upgrade, to ensure atomicity.

### Dependent Hoon Demo

A version of Hoon with a dependent type system could make the type system easier to understand, improving developer experience.  It also has potential to improve the userspace/kernelspace interface, by making it more ergonomic and composable.  Seeing a demo would help other core devs understand this research.  If the compiler for this were written in Hoon, then other core devs could even start experimenting with dependent language features themselves.

### Clean Up Clay `$care`s

Clay's filesystem querying API is cumbersome to use and difficult to implement properly.  A cleaner API would support remote scry better, would be easier for developers to integrate with, and would be less bug-prone.

`~hastuc-dibtux` has done some work on this, but it has not been integrated.

### Shims for Userspace Code at Old Kelvins

The kernel should be able to run applications written at old Kelvin versions.  This is part of the general backward compatibility story, and it would also make it easier to release each new Kelvin version, since we wouldn't have to coordinate with userspace developers to get them to update their applications each time.

Technically, this requires some changes to Gall and Clay to recognize and build old code, and with each old Kelvin we want to support a new shim will need to be written.

### Add `+on-rift` or Similar For Userspace Breach Handling

Applications often have bugs when a peer breaches.  Modifying the userspace/kernelspace API to give Gall agents clearer information about breaches should improve application reliability and developer experience.  One proposal is to add a new `+on-rift` arm to Gall agents to ensure they are always informed about breached peers.

### More Revision Control Tools

At some point, we want to stop using Git and use Clay instead.  Most of what's missing from that is building more tools in Clay that replicate the various Git tools.  Even before that, revision control tooling is useful for forensics and debugging.

`~wicdev-wisryt` knows the most about this.

## Networking

Networking still needs a lot of work.  Much of it relates to content distribution (remote scry and solid-state subscriptions), there are various kinds of performance work that need to be done, and peer discovery and routing need to be made more reliable.

Some of these projects are purely Vere, others purely Arvo, and several involve both, requiring more experience with working on Urbit.

### Add Remote Scry Protocol

The "Fine" remote scry protocol will form the foundation of scalable content distribution in Urbit, by allowing many subscriber ships to read data efficiently from a publisher ship without incurring excessive load on the publisher, which is the bottleneck.

Solid-state publications can be implemented without this by using the existing Ames protocol to publish data, the way Urbit works now -- this will achieve the reliability and developer experience goals of solid-state publications, but not the scaling goals.

Many of the other networking projects build on top of Fine to bring the system closer to the solid-state, referentially transparent future that Urbit promises.

The specification for Fine (warning: somewhat out of date) is here:
https://gist.github.com/belisarius222/d9a9c164817d3e8bbda3c45f7d2000b9

Fine has been implemented and tested some on a testnet, but it will need more testing before deployment.  It affects both Arvo and Vere and requires a Kelvin bump.

### Consolidate Packet Re-Send Timers

Ames sets a lot of timers to remind it to send packets again if they don't get acknowledged fast enough.  Reducing the number of timers lowers disk write usage, improves quiescence (which should eventually let hosting providers use less RAM and thereby lower costs), and should improve overall performance on publisher ships.

The low-hanging fruit is to mark timers as "dead" if the ship they're re-sending packets to haven't been heard from in a while, then have one global re-send timer for these "dead" peers.  For a ship hosting a large group, this could reduce the number of Arvo events per minute by 10x or more.

This is a purely Arvo change.

### Symmetric Routing

Ames routing and peer discovery is somewhat unprincipled right now, leading to a number of bugs and inefficiencies in certain network configurations, such as behind "symmetric NAT"s.  Symmetric routing is a proposal that regularizes routing to make it more reliable and easier to reason about.  This should improve user experience by keeping latency low more reliably, and it will also enable stars to forward packets, which has implications for the value of the address space.

The specification is here:
https://gist.github.com/belisarius222/7ec6f40b3a498c38e696139d8dbd8b10

Implementing this requires changes to Arvo and Vere.  Upgrading to the new routing paradigm might be tricky.  Some other networking improvements have at least a soft dependency on this.

### Improve Sponsor Pinging

The way ships ping their sponsors doesn't always work well behind home routers or other NATs, causing flaky connections.

There is a PR from `~rovnys-ricfer` fixing this, which needs review and testing:
https://github.com/urbit/urbit/pull/5828

### Add Urth-to-Urth Network Push Sessions

Solid-state publications that need low latency, such as chat, can't use the remote scry protocol without adding a new protocol to "push" updates to subscribers as soon as they are created.  This protocol is Urth-to-Urth, and opt-in, to ensure naive runtimes still work without it (both as publisher and subscriber).

The specification is here:
https://gist.github.com/belisarius222/390daafc146f7c6ddd98836e61dc307f

Adding this protocol is almost purely a runtime change, with maybe a single small addition to Arvo.  The spec assumes remote scry and symmetric routing as dependencies.

### Add `%pine` Query-At-Latest Protocol

Remote scry on its own doesn't let one ship determine the latest state of a publication on another ship.  This is solved by adding another protocol alongside the remote scry network protocol to implement `%pine` query-at-latest requests over the network, as pure reads.

The proposal is here (it's not quite a spec yet, but close):
https://gist.github.com/belisarius222/95ad2a5f650ce90a61bb575f9ce1bcba

`%pine` depends on the remote scry protocol.

### Tune `%clog` Backpressure Time and Space Constants

Tuning the constants in Ames's `%clog` system should reduce network flakiness, reduce the number of Arvo events, and improve publication bandwidth, especially until chat uses remote scry and solid-state subscriptions.

This has been implemented but needs review and testing before deployment:
https://github.com/urbit/urbit/pull/5827

### Encrypted Remote Scry

Arvo needs to encrypt scry paths and the values bound to them in order to use the remote scry protocol for private data such as group chats.  This requires changes to the kernel to distribute encryption keys and let applications determine which other ships should have access to data in which publications.

This has been specified informally and partially implemented:
https://github.com/urbit/urbit/tree/ted/encrypted-scry

It has a hard dependency on basic remote scry.  This work also relates to userspace permissioning work, so its design should be reviewed in light of recent changes to userspace permissioning.

### Refactor Ames Vane

The Ames vane could be shorter, easier to read, more performant, and easier to prove correct.

#### Finger Trees for Packet Queues

Ames currently uses ordered maps for its packet queues.  Finger trees, added to handle remote scry packet queues, have better asymptotics and should be used instead.

Each message should also have its own separate packet queue to make the code easier to reason about.

#### Use `+abet` Pattern

Ames's internal architecture has several layers of custom event/effect dispatchers.  Switching to the `+abet` nested core pattern will make the code shorter, easier to read, and easier to modify.

#### Larval Stage Cleanup

Ames's larval stage has grown unwieldy and could use rethinking to make upgrading ti easier.

### Outer HMACs on Packets for DDoS Protection (maybe)

Ames packets need to be decrypted to be authenticated.  Wrapping the packet in an HMAC would let the receiver discard unauthenticated packets faster, improving DoS resilience.

### Forward Secrecy Ratchet in Ames

Ames has no forward secrecy other than manual on-chain key rotation.  This means if an attacker finds the symmetric key between two ships or one of the private keys, they could decrypt the whole history of communication between those ships.

For damage control, Ames should add a cryptographic ratchet to limit the number of messages exposed by any pwned key.  Note that encrypted remote scry does its own key rotation, whose security should mostly be evaluated separately.

## Vere Projects

### Event Log Truncation

The event log grows indefinitely, using more disk space over time.  Once event logs can be truncated, disk space can be reclaimed, using a roughly constant amount of disk space over time (the size of the Arvo snapshot, which grows much more slowly than the event log).  Reducing disk space in this way is important for reducing cost and maintenance burden for running ships.

There are a few levels of event log truncation:
- manual rollover, manual truncation
- automated rollover, manual truncation
- automated rollover, automated truncation

The first, fully manual, version of event log truncation is being polished by `~master-morzod` and should be released soon.  Automation will come later.

### Shared Memory IPC

Vere's two processes, Urth (the I/O process) and Mars (the Nock worker process), communicate using a custom noun-based interprocess communication (IPC) protocol.  This currently uses the Unix stdin and stdout, but using shared memory instead would make IPC significantly faster, reducing event processing latency and improving overall data throughput.

Fast IPC will be especially important once the Urth process is broken up into multiple processes, since instead of an incoming event being sent over IPC once before being run in Arvo, it will be sent twice -- once from the I/O driver process to Urth, then again to the Mars process.

It might be possible to reuse off-the-shelf shared-memory IPC systems, such as Arcan's IPC mechanism or Chromium's "mojo" system.

### Separating IPC Streams

Urth/Mars communication all happens within a single IPC connection.  Separating communication that's unrelated to the event loop (such as logging, scry requests and responses, spinner status notifications, and snapshot notifications) into separate IPC streams should improve performance and increase flexibility for alternate Mars implementations.

### Commit Before Compute

Current Vere needs to run Nock on an event before it can write it to disk.  This places a lower bound on event latency, defined as time between receiving an event and performing its effects, at `D + N`, i.e. disk write latency (`D`) plus nock execution time (`N`).  Commit-before-compute has amortized latency `max(D, N)`, which is usually significantly better.

The way to get this low latency is to have Vere write ("commit") an event to disk without waiting for nock execution ("compute") to complete on that event -- hence the codename "commit before compute".  When a new event is received, Vere will try to run Nock on it if the "Mars" Nock worker process isn't already processing a previous event, and if the disk isn't already writing a previous event, Vere will also write it to disk.  Once the event has been both written to disk and executed, Vere will perform its effects.

Ensuring correct replay in the presence of nondeterministic errors requires modifying the event log to include periodic confirmations of which events were run successfully and which crashed nondeterministically.  It also requires being careful to make sure replay uses at least as many resources (primarily RAM) as the original run, so that an event that ran successfully the first time won't crash nondeterministically the second time, leading to an incorrect replay.

### Pointer Compression

#### 8GB Loom

Vere can only address 4GB of memory at the moment.  That could be raised to hundreds of terabytes by switching from a 32-bit allocator to a 64-bit allocator, but that is a large project and would likely cause slowdowns due to loss of cache locality.  Instead, Vere can be modified to address up to 8GB by using a technique called pointer compression.

In this case, that means aligning all of Vere's allocation boxes at 64-bit boundaries instead of 32-bit boundaries. Each 30-bit noun pointer then refers to a 64-bit slot instead of a 32-bit slot, doubling the total memory addressed.

#### Cell Compression

A further optimization would be to ensure that any page of memory inside the "loom" (noun memory arena) stores only cells (pairs) or atoms (numbers).  This would reduce the size of each cell's allocation box from three 64-bit slots to two, since the size field before and after each cell could be removed -- every allocation box within that page would be the same size, since they're all cells.  Implementing this would also require adding a page table bitmap tracking which pages store cells and which store atoms.

This optimization would not increase the total size of addressed memory, but it would increase the number of cells that could be stored within that memory by 50%. This also compresses cell storage, increasing cache locality and thereby performance.   The majority of Urbit's memory consists of cells, so this optimization would meaningfully increase total data storage capacity.

#### 16GB Loom

Once cells have all been reduced to two 64-bit words, Vere could align all allocations at 128 bits instead of 64.  This would double the amount of addressable memory to 16GB.

### >16GB Loom (New Allocator)

There are two possible versions of this: one is we kick indirect atoms out of the loom into their own memory arena; the other is a 64-bit interpreter.
TODO flesh this out a bit more

### Exit Code Scheme for Mars

Adding a scheme of Unix process exit codes to the Mars process, and handling them in the Urth process (sometimes by printing them with more detail), will make the system easier to debug and maintain.

### Vere Error Handling

There are a number of places where Vere crashes where it should instead handle the error and continue.  Fixing these is important for zero-click maintenance, so that a user or hosting provider doesn't need to restart Vere when something goes wrong.

### New Mars Snapshot Design

New Mars has a novel scheme for ensuring copy-on-write semantics for memory pages in a way that minimizes disk write amplification when taking an incremental snapshot.  This scheme can be backported to Vere, which is especially important for maintaining performance once the loom (noun memory arena) exceeds the size of RAM, which will happen much more frequently with a 4GB or 8GB loom than it does now.

### Multiprocess I/O

We intend to split the Urth I/O process into multiple processes -- one dispatcher process and one process for each I/O driver.  This establishes more security bulkheads between subsystems, it lets each I/O driver be written in a different programming language, and it will facilitate running some I/O processes on other machines in a future cloud host environment.

Note that without shared memory IPC, this will likely slow down the system.

### Multiprocess Event Log

Similarly to breaking up the Urth process, we should split event log reading and writing into its own process, which will communicate with the Mars Nock runner process.  This makes it easier to swap in a different persistence mechanism, including FoundationDB for event log replication.

Note that without shared memory IPC, this will likely slow down the system.

### Dropping Privileges

According to the principle of least privilege, each Vere process should only have privileges from the host operating system that it needs for normal operation.  This is easier to understand, and likely easier to implement well, with multiprocess I/O.

For instance, the Ames I/O driver process should only be allowed to use a UDP port, perform DNS lookups, and send IPC messages to the Urth process.  That way if it gets hijacked, it will be much harder for it to interfere with Urbit or the rest of the host machine.

This is best considered a defense-in-depth approach to security, to minimize the damage from a single part of the system getting hijacked.

### Automatic Binary Upgrades

Arvo updates itself over the air, but current Vere does not.  We should let the binary update itself by downloading a new version and replacing itself with that, instead of forcing the user to run terminal commands to stay up to date.  This would be a big step along the way to zero-click maintenance.

It might need support from Arvo and userspace, so that the user can click "ok" in the web UI to upgrade the binary.

### Automatic Error Handling on Replay

If Vere hits a nondeterministic error on replay, it should retry instead of giving up and crashing.  This retry should also run |trim, |pack, and |meld if needed, to ensure that the replay has at least as many resources as the original run.  This is important for making sure commit-before-compute is safe to replay in the presence of nondeterministic errors.

### Memory-Efficient Meld

The `|meld` command, to deduplicate and defragment memory, can take up to 8GB to run (or maybe more), often eating all available RAM.  For machines that don't have swap space configured, this crashes the process.  A more memory-efficient implementation should reduce this dangerous memory pressure.  This would reduce maintenance burden.

### Automatic Memory Pack/Trim/Meld

Right now, the available memory reclamation routines (pack, trim, and meld) need to be run manually.  Instead, they should run automatically, either triggered by heuristics (e.g. a high-water mark of memory use during an event) or run on a timer.  This will reduce maintenance burden.

Memory-efficient meld is less risky to automate, so this has a soft dependency on that.

### Network DoS Protection

A standard protection against DDoS attacks is to track and rate-limit IP addresses sending malicious packets.  A basic version of this functionality could be added to Vere without too much trouble and give Urbit a modicum of DoS resilience.

### Multi-Session Terminal

Dill, in the Arvo kernel, supports multiple sessions, but the current Urbit terminal client only uses one session.  To make the Urbit command-line more usable, the client should support multiple sessions too.  This work would entail writing a new process that can connect to Urbit and have Dill spawn a new session.

This would improve Urbit's developer experience and open up more possibilities for terminal user interfaces for users who prefer the command line.

### Logging

Urbit emits no log messages, making debugging and telemetry much more difficult.  Adding a basic logging system to Urbit (probably logging to files as a first step, or maybe syslog) would reduce hosting costs, improve release cycle times, and reduce the amount of time it takes devs to debug live ships.

### Clay Sync Error Handling

The filesystem I/O driver doesn't handle filesystem errors properly, which can cause desynchronization between Unix and Clay.  Fixing this would improve developer experience and general reliability.

### `libames`

For smaller devices or existing programs, it would be good to be able to speak the Urbit network protocol by importing a library, `libames`.  This should probably be written in C to make it easy to embed into programs written in other languages.

`libames` would aid in integrating Urbit with other systems, writing iOS clients, and allowing Urbit to be used in internet-of-things applications.

## Vere/Arvo Cross-Cutting Projects

### HTTP Scrying

The scry namespace should be made available over HTTP, to improve developer experience and performance for Urbit clients ("airlocks").  This likely looks like carving out a subset of URL paths (maybe those that start with `/scry`, or similar) to be reserved for scry requests, and the rest of the URL would be a scry path.

This will allow the runtime to intercept these requests, and instead of injecting the request as an Arvo event, it can scry into Arvo for the response.  This saves a disk write, and the runtime could also cache the response so that future requests for that path don't even run Nock.

If this is done well enough, it could lead to the development of HTTP-based thin-client "scry browsers" (UDP-based scry browsers generally require `libames`) that can explore a ship's state, and maybe even serve an auto-generated interface, with minimal client-side logic and state.

### HTTP Mutable URL Caching

Urbit should be able to serve websites at custom URLs efficiently to support serving websites to the old web from a single ship without needing to configure caching reverse proxies such as nginx or varnish.

Vere will maintain a cache mapping from URL to response, and Arvo will invalidate cache entries when the application wants to serve an updated response at that URL.

This is in development:
https://github.com/urbit/urbit/pull/5927

### Better Arvo/Vere Version Negotiation

Improving the Arvo/Vere version negotiation will increase release rate by reducing the amount of work it takes to release a new Kelvin version.

It should be more flexible to allow for a wider variety of deployment patterns, such as pushing out Arvo at a new Kelvin version without updating the runtime -- this kernel would need to communicate with the runtime in compatibility mode, avoiding use of any new features that the old runtime can't support.

### Jet Dashboard Design Research

Urbit's jet dashboard (the code in the runtime that identifies Nock code that has equivalent C code that can be run instead) is quite complex and not as fast as we'd like it to be.

There are a lot of potential ways a jet dashboard could work.  Experimenting with different designs, even just as proofs of concept in Hoon, will help us reduce runtime complexity and increase performance.  Since the jet dashboard is also one of Urbit's security attack surfaces, simplifying it should make the system more secure.

### Arvo/Vere Error Handling

There are a number of cases where Arvo can crash in a way where it gets into an inconsistent state (e.g. Clay does not always handle Ames crashes properly) or gets stuck on something and fails to continue to make progress (e.g. Behn timer expiry events can fail and prevent further timers from running).

A reliable, zero-maintenance Urbit does not have any of these problems.  Each can be individually addressed, but we might also need to rethink the error-handling paradigm to ensure applications are delivered error messages accurately enough.

One proposed design is to track a computation nonce in Arvo that can be used during an error notification event to pinpoint which part of the previous event failed.  Another design would allow applications to register a path of its choosing in the error trace, which Arvo would recognize in the error notification event to route the notification to that application.  Neither design has a written specification yet.

### Timer Improvements

Urbit's timer system could be better in several ways.  As it stands, it's hard to ensure Arvo crashes don't break future timers.  Worse, one broken timer can break all the other ones, even unrelated timers.

In addition to correctness issues, there are also performance improvements to be had.  The current design doesn't allow pipelining timer events so that their disk writes can be batched to improve performance.  Also, if the timer requests were more legible to the runtime, the runtime could handle different kinds of timers differently to facilitate quiescence.

In particular, if Vere could tell a timer was an Ames packet re-send timer, it could find the packet the timer refers to, and instead of waking up Arvo each time the packet needs to be sent again, Vere could assume responsibility for re-sending, while the Arvo state could remain on disk, reducing average RAM usage and thereby reducing hosting costs.

### Generalized Deferral Mechanism

Arvo's Behn vane (kernel module) currently serves two purposes: setting timers, and deferring tasks to later events.  Deferral could be split out into a separate feature, which could aid both in refactoring Behn to be easier to verify and optimize, as described in the Timer Improvements project, and in enabling a form of parallel Nock execution in the future, whose rough outline is here:
https://gist.github.com/belisarius222/1b79c398ef408d75e849f63df3d2cf18

### `+mink` Stack Trace Determinism

If code run inside the `+mink` metacircular evaluation function in the Hoon standard library, which runs all userspace code, errors out deterministically (i.e. hits a trivial infinite loop in the Nock spec), then `+mink` catches the error and retursns a stack trace.  The problem is that to maintain determinism between runtimes, which might have different sets of jets, every jet needs to emit the same Nock hints that its equivalent Nock would have.  This is an error-prone and extremely onerous task.

Various designs have been proposed to ensure determinism, but none have been firmly chosen yet.  One design removes stack trace reporting from `+mink`, replacing the stack trace with null in case of error -- in this design, some out-of-band error notification mechanism would be needed to see the stack trace, such as hint-based logging.

A less restrictive design would limit `+mink`'s returned stack trace's contents to a subset intended to be easier for jets to replicate -- perhaps static text strings that don't refer to the runtime subject (environment).

### Nan Madol (maybe)

A far-out proposal is to have the runtime perform serialization, packetization, encryption, and congestion control, instead of Arvo.  This would be a big conceptual shift and has risks associated with that, but it would massively increase network bandwidth.

Here is a rough spec, which could use some updating:
https://gist.github.com/belisarius222/4ae249c07d9e169b38b4e9f57e0eced4

Alternatives to this project include using a scry-based effect system in Vere, which smart runtimes could retrieve in batches.  This might dovetail with new timer and event deferral systems too.

### `.^` Ergonomics, Determinism, and Interpreter Challenges

The `.^` rune lets userspace code "scry", using a virtual Nock opcode interpreted by the `+mink` metacircular interpreter as a request to read data at a path in the scry namespace.  This provides typed, synchronous access to the scry namespace -- at least the subset of the scry namespace stored in your ship when the scry is run.

#### Ergonomics

One problem is that if a `.^` "blocks", i.e. the ship doesn't know how to answer the query, there are only two options: treat the block as an error, or fetch the data asynchronously, then rerun the code that performed the scry, which will succeed the second time.

Gall treats the block as an error, because it doesn't want to block the whole agent on a single scry.  In the general case, a Gall agent is in the middle of several concurrent (concurrent like coroutines, not parallel) actions, so blocking the agent blocks all of those actions.  Any scry request could block forever, in which case the agent is dead.

Treating a block as an error, however, means userspace code can only safely run `.^` if it knows for sure the data is resident in the ship, which limits its usefulness.  This fragility has been a source of userspace reliability issues.

#### Determinism

This is a problem with Arvo's scry system more broadly than just its `.^` interface: scrying at the current date is not referentially transparent.  As the system makes heavier use of the scry namespace, with the remote scry protocol and solid-state subscriptions, cleaning up referential transparency violations gains importance.

The problem is that the state of a module (vane or agent) can change during an Arvo event, and the date is the same during the entire event.  This means a scry request at the current date could return one value before agent was activated, and then return a different value after the activation -- this violates referential transparency because 

A Draconian fix is to lock Arvo's scry handler at the beginning of the event.  This prevents scry from accessing the latest data within any module if that data changed during the current Arvo event.  This would be an ergonomic loss and would necessitate rewriting a lot of code that makes use of that feature, both in userspace and kernelspace.

Another option would be to increment a counter with each activation of a vane or agent.  The agent would use that counter as the "case" (revision number) in the path it requests with `.^`.  This would ensure referential transparency, at the cost of incrementing counters, which is likely acceptable, and the loss of a certain amount of elegance.

A similar approach would use nonces instead of counters, generated by stretching Arvo's entropy -- this is slower but it has the advantage of hiding the value of the counter from userspace, in case that presents an attack vector.

#### Interpreter Challenges

Without `.^`, the interpreter can treat any Nock expression as a referentially transparent input to the Nock function, i.e. the Nock expression alone is enough to determine the result of the expression.  This is a highly desirable property, allowing Nock expressions to be used as keys in memoization caches and similar interpreter tricks.  With `.^`, the interpreter needs to include the scry handler function in the cache key -- really, the whole stack of scry handler functions, since metacircular evaluation contexts can nest.  Generally, interpreters that properly handle `.^` are more difficult to write.

A counterpoint is that the kernel guarantees (or at least it should guarantee) referential transparency for the scry namespace, so the Nock of the scry handler function shouldn't be needed in the key, as long as the scry handler was supplied by the kernel.  

This counterpoint has a flaw, though: if the data isn't there and the scry blocks, the fact that the scry blocked is captured in the return value of `+mink`.  This means that even with a properly referentially transparent scry handler function, presence vs. absence of local scry data causes nondeterminism without accounting for the Nock of the scry handler function itself.

One proposal is to remove `.^` from the Hoon language, and removing the virtual Nock opcode from the interpreter.  It could be replaced by an explicit delimited continuation (i.e. return a pair of a scry path and a callback to receive the scry result), which would not be as ergonomic from inside a Gall agent, but would be similar and would not implicate the interpreter.

That would be a drastic and potentially destructive change.  No decision has been reached about how to handle this problem.

### Terminal Improvements

`~palfun-foslup` has written a whole suite of improvements to the terminal, which he has written about here:
TODO ask palfun where that writeup can be found

These improvements are slated for release soon.  They open up a lot of opportunities for better developer experience and terminal-based user experience.

### Native UI Research

One of the main barriers to writing an Urbit app is that the standard way to present a user interface is by writing it in JavaScript that runs in a web browser.  This has advantages, but it requires writing code in two languages, and it means you can't stay in Urbit entirely when writing an app.

An "Urbit-native UI system" would alleviate this issue by providing an Urbit-based language for defining user interfaces.  This is a broad remit -- such a language might be a subset of Hoon, a superset of Hoon, a noun layout that's a compilation target of a new language, or even something else.  The important thing is that it would extend the feel of Urbit development into user interface development.  In practice, this likely means the language and framework will make heavy use of concrete data, state functions, the scry namespace, and solid-state publications.

This is a potentially quite difficult and long-running research project.