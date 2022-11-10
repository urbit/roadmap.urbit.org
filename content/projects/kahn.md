+++
title = "Kahn"
date = "2022-06-01"
contributors = ["~silsyn-wathep"]
status = "Completed"
+++


Kahn is a new "control plane" [Vane](https://urbit.org/docs/glossary/vane)
(kernel module). Kahn allows external processes to talk with a ship through a
Unix socket. The external processes can run threads on the ship. One of the main
uses of Kahn is to make it easier for hosting providers to manage ships. There
are many more uses for Kahn besides that case, though.

Kahn is a more robust replacement for the previous `herb` utility.

## More info

- [Binary release on Github](https://github.com/urbit/urbit/releases/tag/urbit-v1.9)
- [Pull request on Github](https://github.com/urbit/urbit/pull/5571)
