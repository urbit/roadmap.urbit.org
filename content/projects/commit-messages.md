+++
title = "Commit Messages"
date = "2022-03-01"
contributors = [""]
status = "Completed"
+++

Clay (Urbit's filesystem) has so-far supported simple tags for commits, but it
has not supported proper commit messages.

Now, the new Story feature has been introduced. Stories are commit messages
comprised of a title and body containing arbitrary text. Stories can be added to
any `case` (revision), deleted, or edited. Stories are saved in a `<desk>.story`
file in the root of the desk. They have proper Unix representation, so can be
edited in ordinary text editors. There are a few generators for managing them
and printing logs in a similar manner to `git log`.

This feature will be useful for future developer tooling like desk dependencies,
and ultimately as part of a fuller git-like experience within Urbit.

### More info

- [Pull request on Github](https://github.com/urbit/urbit/pull/5612)
