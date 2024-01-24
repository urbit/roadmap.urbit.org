+++
title = "Increase Userspace Legibility"
arcs = []
start_date = "2024-01-15"
end_date = "2024-06-30"
owner = "~lagrev-nocfep"
contributors = ["~lagrev-nocfep", "~midden-fabler", "~tinnus-napbus", "~tamlut-modnys"]
status = "Current"
description = """
Improve the Urbit developer experience by filing off a lot of burrs.  E.g., provide aliases and wrapper gates for the less-intuitive parts of Hoon and the Urbit standard library.
"""
+++

Urbit is a powerful platform, but the learning curve is steep.  This is due to a combination of inconsistent affordances, an unconventional naming paradigm, and 

This project is something of a grab bag, and besides enumerated objectives we anticipate several attacks of opportunity to present themselves and be resolved.

## Detail

Everything that anyone has ever complained about on Urbit is considered an eligible complaint.  We will triage these into several categories by impact and difficulty to fix.  (Some, of course, are not bugs but features and will be left intact.)

The first priority is to compose userspace libraries or a wrapper core for Gall (depending on final consensus) that provides names legible to developers new to Hoon.  (E.g., `append` instead of `weld`.)  After that is complete, we will produce and sponsor a suite of tools intended to improve the developer experience, revise elements of the kernel (such as scry inconsistencies), and work on making development easier and more pleasant for the modal userspace developer.

Some developments are out of scope for this project:  for example, we can envision improving solid state subscriptions, but the initial composition of such a library or pattern would have been beyond this project's objectives.  Appropriate suggestions that are out of scope will be suggested to the core development team.

A partial list of improvements under consideration for implementation or sponsorship:

- Fixing Aqua/Pyro for better testing.
- Supporting `/` fas runes out of order.
- Producing better agent examples and pattern examples, and documenting these clearly.
- VSCode extension improvement.
- Making star market value discoverable on network.
- Fixing the prettyprinter.
- Namespacing parts of the Hoon parser.
- Make SSS real.
- Finish `|mass` in Arvo.
- Update `/lib/sequent` so the TMI/`?~` expediency is hiddenfor users (if possible).
- Pin app `|suspend` across updates.
- Allow Clay desk deletion.

## Code

This project is being actively developed and can be tracked in pull requests prefixed `(Userspace trawl)` at [urbit/urbit](https://github.com/urbit/urbit).
