+++
title = "Overview"
+++

# Introduction

Urbit has been in development for over a decade.  Most of that time has been spent on building the first or second versions of each major component, often as little more than a prototype.  Only in the last year has the system matured enough for us to be able to enumerate the remaining blockers to mass adoption.

Over the next year or two, the Urbit core devs are focused on making the Urbit OS a fully featured, bulletproof, easy-to-use consumer product.  This roadmap is intended to clarify how the core devs plan to accomplish this task, in as much detail as possible.

I want the members of the broader Urbit ecosystem to understand what needs to be done, how each piece will be built and why, a rough timeline of what to expect when, and ideally how they can help accelerate development.

The plan is of course subject to change, but I expect our orientation to be stable.  Here are the high-level goals that need to be achieved to make Urbit a consumer product:
- raise kernel and runtime release frequency to weekly
- develop confidence in security across the board
- manage enough data in the runtime that users don't need external S3 storage
- approach zero-click maintenance for users
- improve network performance until a ship can handle 100,000 chat subscribers
- make hosting businesses profitable by reducing unit and maintenance costs
- stop breaking backward compatibility for apps

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

#### Upgrade System Overhaul

Early in the year, bugs were identified in Arvo's upgrade system that have made pushing out new releases risky.  As of the latest release, those bugs no longer brick users' ships, but they can still erroneously turn off apps that should be running, requiring manual user attention to resolve.  The "agents-in-Clay" project addresses these bugs by greatly simplifying the upgrade system, making its correctness much easier to verify.

Here is the specification for the agents-in-Clay work (slightly out of date):
https://gist.github.com/belisarius222/2ae74bfb5a40860b59d28970d29b3329

The agents-in-Clay work is now nearing completion (the first version, without migration waypoints).  Once it's deployed, release frequency for the kernel and runtime can increase.  Projects blocked on this release include the basic remote scry protocol and userspace permissioning.

#### Event Log Truncation

In parallel, a major update to the runtime is also approaching release: "event log truncation".  This is a basic feature of "prevalence systems" such as Urbit's, to ensure disk usage stays roughly constant over time instead of increasing linearly as it does now.

Implementing event log truncation required first moving the responsibility for managing the event log from Vere's "Urth" I/O process to its "Mars" Nock worker process, colocating event log persistence with snapshot persistence to ensure consistency when deleting old events from the log.

#### Terminal Improvements

`~palfun-foslup`'s improvements to the terminal subsystems, having languished unreleased for many months, are slated for the next release after event log truncation and agents-in-Clay.

#### Basic Remote Scry

The basic remote scry protocol is also on the docket, needing only some more review and testing before release.

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

#### Other Strategic Priorities

TODO: link to current projects

##### Next Projects

### Scale the Team and Processes

The first step in scaling the core dev team is to hire more devs.  The Urbit Foundation and Tlon are both expanding their internal dev teams.  UF plans to add four full-time core devs over the next year, and Tlon added one recently.

In addition to raw numbers, core dev needs to become more of a traditional open-source project than it has been so far.  This means we need better reference documentation, guides, training, roadmaps, and specifications, especially targeted toward intermediate and advanced developers -- Hoon School has been bringing in a large number of such developers, some of whom should be brought into core development.  Publishing this roadmap represents the core team's first major step toward developing in public, which we plan to increase dramatically.

The architecture of the system will also be examined critically to evaluate points where boundaries can be drawn between subsystems to facilitate their independent development.  Splitting out I/O drivers and event log persistence into their own Unix processes is an example of this kind of thinking. 

Also important for scaling the team is the quality of the testing and release processes.  Tlon has made major strides in the release process this year: their "devstream process" for phased deployment has caught many bugs that would have hit users in previous years.  More automated tests (unit tests, integration tests, and end-to-end "aqua" tests that simulate a fleet of virtual ships inside the Aqua agent) will increase the level of assurance of each deployment, reducing risk and increasing confidence when making a change.

