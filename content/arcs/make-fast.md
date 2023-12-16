+++
title = "Make Urbit Fast"
class = "bg-green-400"
+++

Urbit has never been seriously optimized for performance, and that's changing in
early 2024.

The Ares project lays the groundwork for fast Nock execution and presents many
opportunities for ongoing optimization. The project was in R&D throughout 2022
to determine viability and entered implementation in 2023, and is slated for
initial release in Q1 of 2024.

Separately, Urbit's networking is slow due to inefficient encryption and event
log (i.e. disk write) overhead incurred from handling individual packets in
Ames' congestion control algorithm. In the latter half of 2023 we identified a
way to significantly simplify Urbit's networking stack and move compute-heavy
computation into the runtime, which will produce a roughly 1000x improvement in
network throughput.

