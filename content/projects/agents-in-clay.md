+++
title = "Agents in Clay"
arcs = ["Increase Release Frequency", "Improve Backward Compatibility"]
spec = "https://gist.github.com/belisarius222/2ae74bfb5a40860b59d28970d29b3329"
start_date = "2022-07-06"
end_date = "2022-12-01"
owner = "~wicdev-wisryt"
status = "Current"
description = """
This project overhauls Arvo's upgrade system to make it simpler and more
reliable.  Since it moves the locus of control of agents from Gall to Clay, it's often referred to as the "Agents in Clay" project.
"""
+++

This project overhauls Arvo's upgrade system to make it simpler and more
reliable.  Since it moves the locus of control of agents from Gall to Clay, it's often referred to as the "Agents in Clay" project.


Early in 2022, bugs were identified in Arvo's upgrade system that have made pushing out new releases risky.  As of the latest release, those bugs no longer brick users' ships, but they can still erroneously turn off apps that should be running, requiring manual user attention to resolve.  The "agents-in-Clay" project addresses these bugs by greatly simplifying the upgrade system, making its correctness much easier to verify.

- [PR] (https://github.com/urbit/urbit/pull/6092)
