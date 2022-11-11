## Introduction

The highest priority for the core team is to release a number of kernel and runtime projects that are in a completed or nearly completed state.  Some of these projects had to be shelved due to the need to fix some severe user-facing issues.  In addition to feature work, a large portion of dev time in 2022 was spent reducing kernel memory use and fixing bugs.

On the memory use front, "tombstoning" was added to Clay to allow files to be deleted, freeing their memory.  Clay stopped storing diffs to files, switching to storing only snapshots of files.  The Ford cache was made referentially transparent, enabling global deduplication of memory for Ford builds across multiple app desks.  Space leaks in Ford where Clay state leaked into build results were plugged.

As for bug fixing, the "gall request queue fix", which involved major changes to Ames and Gall and a complex online migration, was the largest bugfixing project.  Fixes were also deployed for Ames breach handling, Behn timers getting stuck, insecure "bail: meme" out-of-memory error handling, and stuck Azimuth PKI tracking.

The highest-priority project being worked on currently is the "agents-in-clay" work, which replaces the system the kernel uses to upgrade itself -- the new system is much simpler and more reliable.  Once this is released, releasing other code will be less risky and can proceed faster.

Clearing the backlog of projects waiting to be released is the team's main goal for the next few months.  Many of the other current projects, such as logging, Vere build system improvements, and userspace Kelvin shims, should increase release cadence in the future.

Along with process-oriented changes, work is also proceeding on projects relating to other goals: userspace permissions will be a major step forward in security, and the New Mars and solid-state publications projects are essential for network scaling.
