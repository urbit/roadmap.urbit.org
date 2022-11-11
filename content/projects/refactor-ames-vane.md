+++
title = "Refactor Ames Vane"
manpower = "1 Engineer"
duration = "1-2 Months"
lead = "TBD"
status = "Future"
+++

The Ames vane could be shorter, easier to read, more performant, and easier to prove correct.

#### Finger Trees for Packet Queues

Ames currently uses ordered maps for its packet queues.  Finger trees, added to handle remote scry packet queues, have better asymptotics and should be used instead.

Each message should also have its own separate packet queue to make the code easier to reason about.

#### Use `+abet` Pattern

Ames's internal architecture has several layers of custom event/effect dispatchers.  Switching to the `+abet` nested core pattern will make the code shorter, easier to read, and easier to modify.

#### Larval Stage Cleanup

Ames's larval stage has grown unwieldy and could use rethinking to make upgrading it easier.