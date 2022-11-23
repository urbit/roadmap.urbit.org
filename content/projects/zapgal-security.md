+++
title = "Zapgal Security"
arcs = ["Improve Security","Improve Backward Compatibility"]
duration = "1 Month"
manpower = "1"
status = "Future"
owner = "TBD"
description = """
Turning off the `!<` ("zapgal") rune in userspace will reduce the security attack surface of the kernel, reducing the kernel's vulnerability to attack by malicious applications.
"""
+++

Turning off the `!<` ("zapgal") rune in userspace will reduce the security attack surface of the kernel, reducing the kernel's vulnerability to attack by malicious applications.

An issue with the current Gall is that it encourages applications to use the unsafe `!<` ("zapgal") rune.  This rune allows an application to emit data to the kernel that the kernel thinks has a certain type, but which actually has a different type.  This is theoretically possible for the kernel to defend against, but needing to safely ingest maliciously typed data from userspace would significantly increase the security attack surface area of the kernel.

There are two ways this could be addressed: either the Hoon type system could be extended to propagate type correctness proofs for `$vase`s (a pair of a noun's type and value, representing a dynamically typed value), which would close the type hole in `!<` and make it safe; or the kernel can disallow `!<` in userspace code.

We often refer to the first option as "safe vases" or "opaque vases", since the type system feature required to know that a vase is safe is related to a common type system feature known as "opaque types".  Many type systems have this feature, but building it in Urbit poses unique difficulties because Urbit loads code for applications from multiple security domains, meaning the type proofs would need to extend across those domains -- this is almost certainly tractable, but it is a harder problem than the one solved by whole-program compilation systems like GHC, so it's not clear that the added complexity is worth it, and its novelty implies risk of development timeline slippage.

There are really two different versions of the safe vases option: carry around extra constraints in the type system just for vases, or support more general "safe" types.  If it's just vases, that's quite doable, if nontrivial, by turning +slop and +slap into runes and changing the Biblicals system.  General support for user-defined safe types remains a research problem.

If `!<` is not allowed, we will in practice need a dynamic Gall again, even without solid-state publications -- otherwise, an application will need to traverse each noun it receives to validate ("clam") it, introducing a performance regression.  The kernel will run each application "in vase mode", i.e. dynamically typed.  It will perform runtime typechecks on the effects those applications emit, with a memoization cache for the typechecks -- this is how Arvo runs vanes, and it's how old Gall ran applications.

Our current plan is to build dynamic Gall and turn off `!<` in userspace, but it should be noted that we have not made a firm decision not to eventually build safe vases too, which would allow a safe version of `!<` to be reintroduced.
