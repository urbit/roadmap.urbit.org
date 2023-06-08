+++
title = "Refactor Ames Vane"
arcs = ["Zero-click Maintenance", "Improve Network Performance"]
start_date = "2022-12-01"
end_date = "2023-03-16"
manpower = "1 Engineer"
owner = "~norsyr-torryn"
status = "Future"
description = """
The Ames vane could be shorter, easier to read, more performant, and easier to prove correct.
"""
+++

The Ames vane could be shorter, easier to read, more performant, and easier to prove correct.

#### Finger Trees for Packet Queues

Ames currently uses ordered maps for its packet queues.  Finger trees, added to handle remote scry packet queues, have better asymptotics and should be used instead.

Each message should also have its own separate packet queue to make the code easier to reason about.

#### Use `+abet` Pattern (Completed 3/16/23)

Ames's internal architecture has several layers of custom event/effect dispatchers.  Switching to the `+abet` nested core pattern will make the code shorter, easier to read, and easier to modify.

Update: This was merged in this PR:
https://github.com/urbit/urbit/pull/6351

#### Larval Stage Cleanup

Ames's larval stage has grown unwieldy and could use rethinking to make upgrading it easier.
