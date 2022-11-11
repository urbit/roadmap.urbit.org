+++
title = "King Haskell"
date = "2021-01-29"
contributors = ["~littel-ponnys", "~pilfer-pandex", "~siprel"]
status = "Completed"
+++

King Haskell is a re-implementation of Vere's C-based King. It has been in
development for some time and was finally released with v1.1 of the binary. A
Haskell-based runtime has the advantages of the Haskell language, being purely
functional and statically typed.

King Haskell also introduces a couple of new features. It can have its HTTP(S)
ports specified explicitly, and it has a daemon mode, where the user can connect
and disconnect a terminal separately from the underlying process. This makes it
easier to manage with a `systemd` service or similar.

## More info

- [Release on Github](https://github.com/urbit/urbit/releases/tag/urbit-v1.1)
- [Pull request on Github](https://github.com/urbit/urbit/pull/2107)
