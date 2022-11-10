# Current Projects

The highest priority for the core team is to release a number of kernel and runtime projects that are in a completed or nearly completed state.  Some of these projects had to be shelved due to the need to fix some severe user-facing issues.  In addition to feature work, a large portion of dev time in 2022 was spent reducing kernel memory use and fixing bugs.

On the memory use front, "tombstoning" was added to Clay to allow files to be deleted, freeing their memory.  Clay stopped storing diffs to files, switching to storing only snapshots of files.  The Ford cache was made referentially transparent, enabling global deduplication of memory for Ford builds across multiple app desks.  Space leaks in Ford where Clay state leaked into build results were plugged.

As for bug fixing, the "gall request queue fix", which involved major changes to Ames and Gall and a complex online migration, was the largest bugfixing project.  Fixes were also deployed for Ames breach handling, Behn timers getting stuck, insecure "bail: meme" out-of-memory error handling, and stuck Azimuth PKI tracking.

## Upgrade System Overhaul

Early in 2022, bugs were identified in Arvo's upgrade system that have made pushing out new releases risky.  As of the latest release, those bugs no longer brick users' ships, but they can still erroneously turn off apps that should be running, requiring manual user attention to resolve.  The "agents-in-Clay" project addresses these bugs by greatly simplifying the upgrade system, making its correctness much easier to verify.

Here is the specification for the agents-in-Clay work (slightly out of date):
https://gist.github.com/belisarius222/2ae74bfb5a40860b59d28970d29b3329

The agents-in-Clay work is now nearing completion (the first version, without migration waypoints).  Once it's deployed, release frequency for the kernel and runtime can increase.  Projects blocked on this release include the basic remote scry protocol and userspace permissioning.

## Event Log Truncation

In parallel, a major update to the runtime is also approaching release: "event log truncation".  This is a basic feature of "prevalence systems" such as Urbit's, to ensure disk usage stays roughly constant over time instead of increasing linearly as it does now.

Implementing event log truncation required first moving the responsibility for managing the event log from Vere's "Urth" I/O process to its "Mars" Nock worker process, colocating event log persistence with snapshot persistence to ensure consistency when deleting old events from the log.

## Terminal Improvements

`~palfun-foslup`'s improvements to the terminal subsystems, having languished unreleased for many months, are slated for the next release after event log truncation and agents-in-Clay.

## Basic Remote Scry

The basic remote scry protocol is also on the docket, needing only some more review and testing before release.

## Solid-State Publications

For scalability, basic solid-state publications are being prototyped.  This is the next step after basic remote scry toward scalable data publishing on Urbit.  These prototypes live in userspace; once we've proven the model with some real-world examples, we can build kernel support into Gall.

## Quick Boot

The "quick boot" project aims to bring initial Urbit boot time down from ~10 minutes to well under a minute.  This is short enough to make a material impact on adoption, since if a user gets bored while waiting for a ship to boot, they're much more likely to forget about it and never complete the onboarding.  This is useful for hosting providers, CI testing, and developer experience.  It has been worked on for a few months, and the first few steps are complete.  One of the last steps, now written and in the testing phase (https://github.com/urbit/urbit/pull/6044), is to make Ford caches portable between ships.

## Store More Data

Pointer compression, one of the projects in the [runtime data management](TODO:link)
arc, is being worked on currently by ~barter-simsum.

## Reduce `|meld` Memory Use

Reducing `|meld` memory use is being worked on.  For many users, `|meld` is unusable, since they don't have swap space set up on the machine they use to run their ships and it can use enough memory to kill the Urbit process.  For users whose looms are almost full, this issue can prevent them from running their ships at all, so fixing it is an important step toward zero-click maintenance.

## Improve Vere Build System

The build system for Vere has been the source of many headaches for years.  Experiments are being conducted to extract Vere from the monorepo into its own git repository and replace the current Nix build setup with a new one based on the Bazel build system.  If successful, these experiments could greatly reduce the amount of friction involved in Vere development, CI testing, and deployment, increasing the rate of development and releases.

## New Mars

New Mars is an experimental rewrite of the Nock interpreter, including its own noun allocator, Nock -> machine code compiler, and incremental snapshot architecture.  New Mars also includes a new Nock static analysis system called "subject knowledge analysis", which has the potential to increase general Nock performance and also to streamline the jet dashboard (the system that checks whether a jet can be run instead of Nock), which is one of the most complex subsystems in current Vere.

Part of New Mars's snapshot architecture has already been backported to Vere.  We expect more of that research, possibly including subject knowledge analysis, to be amenable to backporting, increasing the short-term payoff of this long-term project and likely easing later integration.

## Kelvin Shims for Old Userspace

TODO: link to project listing for this

## Ames Bug Fixing

Multiple bugs were introduced by a major release in mid-2022, called the "gall
request queue fix".  `~norsyr-torryn` is fixing these bugs.

TODO: github link

## Doccords

The "doccords" project is also almost done.  This adds docstrings, a common programming language feature, to Hoon, which should aid especially new Hoon programmers in learning the system more easily.
