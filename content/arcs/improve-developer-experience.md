+++
title = "Improve Developer Experience"
class = "bg-wall-500"
+++

Urbit, like all operating systems, is primarily a tool for developers to build applications.  For Urbit to win, the experience of developing applications needs to be top-notch.  A few things need to work well for this to be the case.  It should both be quick and easy to write and distribute a small application and know that it works properly.  Sophisticated applications with large teams of developers and complex internal processes also need to be low-cost to maintain.  Finally, the developer experience of Urbit OS itself (kernel and runtime) needs to be good, to maximize productivity when working on the core system.

A lot of different considerations factor into developer experience: source code management, dependency management, build times, general reliability, software distribution features, internal and external build system features, support for continuous integration and deployment, test harnesses, debuggers, telemetry (e.g. logs and metrics), and diagnostic tools all play a role.

Not to be discounted is the effect of the quality of an API on developer experience.  A clean API that exposes solid, composable abstractions and has an ergonomic interface facilitates productivity much more than an API with leaky abstractions and a finicky or fiddly interface.  The Urbit operating system exposes several such interfaces, and they should all be high-quality.