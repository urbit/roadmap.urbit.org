## Introduction

The highest priority for the core team is to release a number of kernel and runtime projects that are in a completed or nearly completed state.  Some of these projects had to be shelved due to the need to fix some severe user-facing issues.  In addition to feature work, a large portion of dev time in 2022 was spent reducing kernel memory use and fixing bugs.

On the memory use front, "tombstoning" was added to Clay to allow files to be deleted, freeing their memory.  Clay stopped storing diffs to files, switching to storing only snapshots of files.  The Ford cache was made referentially transparent, enabling global deduplication of memory for Ford builds across multiple app desks.  Space leaks in Ford where Clay state leaked into build results were plugged.

As for bug fixing, the "gall request queue fix", which involved major changes to Ames and Gall and a complex online migration, was the largest bugfixing project.  Fixes were also deployed for Ames breach handling, Behn timers getting stuck, insecure "bail: meme" out-of-memory error handling, and stuck Azimuth PKI tracking.

TODO summary of current projects

## Ames Bug Fixing

Multiple bugs were introduced by a major release in mid-2022, called the "gall
request queue fix".  `~norsyr-torryn` is fixing these bugs.

TODO: github link

