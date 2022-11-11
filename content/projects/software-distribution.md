+++
title = "Software Distribution"
date = "2021-09-29"
contributors = ["~rovnys-ricfer", "~wolref-podlex", "~palfun-foslup", "~nocsyx-lassul", "~hastuc-dibtux", "~littel-wolfur", "~wicdev-wisryt"]
status = "Completed"
+++

While [Clay](https://urbit.org/docs/glossary/clay) (Urbit's filesystem) has long
supported multiple desks, it so-far has only run software from one of them, the
`%home` desk. Landscape, the web-based UI, has also had limited support for
integrating third-party apps. This has made third-party app development and
distribution difficult.

To make building on Urbit easier, a number of new features have been introduced:

- Code can now be run from any desk, not just `%home`. This allows developers to
  create custom desks for their apps.
- Landscape is now separate from the Groups app. It allows third-party apps to
  be installed, managed and launched from their tiles on its home screen. The
  `%docket` agent has been introduced, which developers can use to manage app
  tiles and front-end resources.
- Any ship can publish an app. Other users can browse and install a ship's
  published apps in Landscape, and automatically receive updates from the
  publisher.
- The notification system (`%hark-store`) has been separated from Groups, so all
  apps can create notifications in Landscape.
- The existing web terminal, Bitcoin wallet, and Groups app have been separated
  into their own desks, and the `%home` desk has been replaced with `%base`,
  which contains the kernel, standard library, and core agents.

Together, these changes create a complete system for developers to build and
distribute apps on Urbit.

## More info

- [Github release](https://github.com/urbit/urbit/releases/tag/urbit-os-v2.101)
- [App distribution docs](https://urbit.org/docs/userspace/dist/dist) -
  comprehensive developer documentation of the new third-party desk publishing
  system. This includes a walk-through of creating and publishing a desk.
