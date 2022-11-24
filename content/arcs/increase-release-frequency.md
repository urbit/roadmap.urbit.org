+++
title = "Increase Release Frequency"
class = "bg-purple"
+++

Increasing the speed of releases is the core dev team's highest priority, since it will accelerate the pace of development overall.  

We will make a number of changes to the kernel and runtime for this purpose.  Also, the Urbit Foundation and Tlon are both expanding their core dev teams.

The first step is to make the upgrade process itself more reliable.  The "agents in Clay" project, slated for the next release as November 2022, rewrites the kernel's upgrade system in a much simpler way, making it easier to reason about and less fragile.

Backward compatibility for apps will also increase release frequency for the kernel, so that is being worked on already.  See the [backward compatibility section](/arcs/improve-backward-compatibility) for more detail.  A related project is to automate runtime upgrades to lessen the maintenance burden runtime releases impose on users.

Later work will likely involve building more extensive testing and telemetry tools to expedite the quality assurance phase of releases.

In addition to raw numbers, core dev needs to become more of a traditional open-source project than it has been so far.  This means we need better reference documentation, guides, training, roadmaps, and specifications, especially targeted toward intermediate and advanced developers -- Hoon School has been bringing in a large number of such developers, some of whom should be brought into core development.  Publishing this roadmap represents the core team's first major step toward developing in public, which we plan to increase dramatically.

The architecture of the system will be examined critically to evaluate points where boundaries can be drawn between subsystems to facilitate their independent development.  Splitting out I/O drivers and event log persistence into their own Unix processes is an example of this kind of thinking. 

Also important for scaling the team is the quality of the testing and release processes.  Tlon has made major strides in the release process this year: their "devstream process" for phased deployment has caught many bugs that would have hit users in previous years.  More automated tests (unit tests, integration tests, and end-to-end "aqua" tests that simulate a fleet of virtual ships inside the Aqua agent) will increase the level of assurance of each deployment, reducing risk and increasing confidence when making a change.