+++
title = "Desk-Based Namespacing"
duration = "3-6 Months"
manpower = "1-2 Engineers"
status = "Future"
lead = "TBD"
+++

Desk-based namespacing should improve reliability, maintenance, and developer experience.

Desk-based namespacing will fix a name collision issue with Gall agents.  We also expect it to improve developer ergonomics by bringing the system slightly closer to a "server-side components system".

Each Urbit "app" a user installs is a "desk" (i.e. self-contained filesystem snapshot) that generally contains source for several Gall "agents", each of which is a long-running stateful service.  When an agent communicates with another agent, it uses the other agent's name (and the ship it's running on).

The agent's name is just a simple string, like 'dojo', that does not include the desk name.  If the user tries to install a new app desk containing an agent with the same name as the agent on another desk, there is now a conflict -- if the kernel installed the new desk too, it would not be able to keep both agents with the same name running.  Right now, last-installed wins, which has caused numerous support problems, mostly due to developers accidentally including extra agents in their app desks that end up usurping the original agents.

With this flat namespace for agent names, there's no good way to prevent conflicts.  The more apps get published, the more likely some of them will contain agents whose names collide.  The agents within a desk are implementation details of the application, so it's frustrating for a user to be presented with an incompatibility that's apparently due to some abstruse technical problem -- exactly the sort of thing Urbit purports to prevent.

The way we plan to fix this is for agents to send messages to a ship and path, instead of a ship and agent name.  This path will look like `/[desk]/[agent]/rest/of/path`.  The 'foo' agent on desk 'a' will be addressable at a disjoint set of paths from the set exposed by another 'foo' agent on desk 'b'.  The kernel can run both simultaneously with no conflicts or ambiguities, so the user can seamlessly run both apps.

There is still the potential of conflicts between desk names, but that's less likely since there are fewer desks than agents, accidental name collisions can be more easily avoided, and in the case of a conflict the user could be presented with a dialog box saying "you already have an app named 'such-and-such' -- do you want to keep the old one or replace it?", which is simpler.

Communicating with an agent at a whole path rather than a single string makes the set of agents within a desk more clearly an implementation detail, since a path as public endpoint doesn't expose which agents are running.  `/foo/bar/baz` could be an agent defined at `/bar/baz` within the `foo` desk, or the subpath `/baz` exposed by the agent 'bar'.

This design also preserves an important part of Urbit that would be easy to lose: application developers don't usually have to build "service discovery layers".  Most agents hard-code the agent names for the other agents they communicate with.  With desk-based namespacing, these agents will hard-code the desk and agent name.

There will likely be complications from this change, including in Dojo syntax and userspace permissioning, that make integration nontrivial.