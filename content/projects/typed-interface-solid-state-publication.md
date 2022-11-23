+++
title = "Typed Interface to Solid-State Publications"
arcs = ["Improve Network Performance", "Improve Backward Compatibility"]
duration = "4-8 Months"
manpower = "1-2 Engineers"
status = "Future"
owner = "~rovnys-ricfer"
description = """
A typed interface to solid-state publications should improve developer experience and performance (by avoiding runtime typechecks and type coercions).
"""
+++

A typed interface to solid-state publications should improve developer experience and performance (by avoiding runtime typechecks and type coercions).

For ergonomics, Gall should also keep applications supplied with typed, synchronous access to both published and subscribed data.  In order for this to work seamlessly, Gall needs to keep this data in scope for a Gall application -- in other words, the data needs to be injected into the application's subject, just like the `$bowl` of event-specific data that Gall normally injects, which contains the current ship, date, entropy, etc.

Unlike the `$bowl`, however, the Hoon type of the state in a solid-state publication varies by publication type.  Each publication type will be defined using a "mark definition", just like a Clay filetype.  This mark definition will specify the type of the state, type of the diff, and a function that applies a diff to a state to obtain the new state.  Both publisher and subscriber Galls will run this function to keep their states up to date when the publishing application emits a new diff.

Because each publication type has its own Hoon type and each application will have a different set of types of publications and subscriptions, each application needs to have its own Hoon type.  This is different from the current "static" Gall, in which all applications have type `$agent:gall`.  Old "dynamic" Gall did have this property, though.

Old dynamic Gall was hard to work with and teach to new developers.  There is a risk that switching back to a dynamic Gall will make it harder to work with.  Our curent position is that we can mitigate these problems by maintaining three positive properties of new Gall that old Gall did not have:
- support for agent-to-agent transformer libraries, such as `+dbug`, `+verb`, and `+shoe`
- same set of arms for every agent, or at least the same set of required arms
- a "default agent" library can be used to stub out arms with default behavior
- there is a type definition in the standard library that a dev can read to understand which arms are required and their types, and the developer can get an easily understood compile-time type error if their agent fails to typecheck

Every agent in dynamic Gall has a different type, but a parameterized type could be expressive enough to describe all agents.  It would describe a core with a fixed set of arms, but whose internal type, input and output types, and pub/sub types are type parameters that vary by agent.
