+++
title = "Ford Fusion"
date = "2020-06-01"
contributors = ["~rovnys-ricfer", "~wicdev-wisryt"]
status = "Completed"
+++

Previously, [Arvo](https://urbit.org/docs/glossary/arvo) (Urbit's OS) had a
separate build system [Vane](https://urbit.org/docs/glossary/vane) (kernel
module) called [Ford](https://urbit.org/docs/arvo/ford/ford). The Ford Fusion
update merged Ford into [Clay](https://urbit.org/docs/glossary/clay) (the
filesystem Vane), so that Ford no longer exists as an independent Vane, and
instead Clay handles the build process internally.

The purpose of Ford Fusion was to fix issues with over-the-air updates
encountered in the past. Ford fusion ensures updates are:

- Atomic: the update should complete or fail in one transaction. If it fails,
  the system shouldn't get stuck.
- Self-contained: there must be no implicit dependencies or hysteresis
  (dependence on previous system states) when building the new software from
  source.
- Ordered: updates must be monotonically sequenced from the system's lowest
  layer to highest.

The new update system corrects a few long-standing bugs with the previous one,
and the new build system is simpler, smaller (by around 5,000 lines), and easier
to manage.

Since deployment of Ford Fusion, OTAs have been much smoother. Before Ford
Fusion, it was common for an OTA to take several hours, use too much memory, and
leave ships in inconsistent states. After Ford Fusion, multiple OTAs have been
pushed out, including kernelspace changes, and most users didn't even notice.

## More info

- [Ford Fusion blog post](https://urbit.org/blog/ford-fusion) - this explains
  the rationale and design of Ford Fusion in great detail.
- [Ford Fusion pull request on Github](https://github.com/urbit/urbit/pull/3060)
