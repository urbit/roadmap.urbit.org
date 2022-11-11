+++
title = "Vere Upgrades"
date = "2022-06-01"
contributors = ["~master-morzod", "~silsyn-wathep"]
status = "Completed"
description = """
Adds features to simplify upgrading the binary for users.
"""
+++

So far, whenever a new version of the Urbit runtime Vere is released, it has
required users to manually download the new copy and swap it out. This has made
upgrades complicated, especially for less technically inclined users.

With the new version 1.9 of Vere, a few new features have been introduced into
the binary that makes upgrading a lot easier. The first is the concept of
"docking". When a new ship is booted, Vere will automatically copy itself into
the pier, at `[pier]/.bin/[pace]/vere-v[version]-[architecture]`. It will also
create a link to this file at `[pier]/.run`. This means that after the initial
boot, the pier is self-contained and can be run with `[pier]/.run`, making the
separate binary unnecessary.

The `pace` mentioned in the path above represents a release channel. At the time
of writing, the default `pace` is `live`, which is for standard, stable
releases. Alternative release channels will be introduced in the future, for
things such as pre-release testing, nightly builds, etc. The `pace` is specified
in a text file at `[pier]/.bin/pace`.

Finally, a binary upgrade feature has been introduced called `next`. If you run
the `next` utility, Vere will check if there is a newer binary version available
for the current `pace`. If there is, it will automatically be downloaded and
installed. This means it's no longer necessary to go and manually download new
binaries and swap them out, it's all managed inside the pier by Vere.

## More info

- [Release on Github](https://github.com/urbit/urbit/releases/tag/urbit-v1.9)
- [Runtime Reference](https://urbit.org/using/running/vere) - This explains all
  of Vere's options and utilities, and gives common usage examples.
