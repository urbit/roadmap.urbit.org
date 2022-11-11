+++
title = "Shims for Userspace Code Over Old Kelvins"
manpower = "2 Engineers"
duration = "2 Months"
end_date = "2023-02-01"
contributors = ["~tinnus-napbus", "~dinleb-rambep"]
lead = "~dinleb-rambep"
status = "Current"
+++

As it stands, every Kelvin change breaks backward compatibility, requiring app devs to publish modified code so their users can keep the app running.  This needs to happen less frequently over time, until eventually apps can be "write once, run forever."

The first step is to build scaffolding into the kernel so that compatibility shims can be added when a breaking change is released, so that app developers won't need to change their code to keep their apps running on newer kernels.

Even once it's possible to build a shim to run old apps, not every breaking change will include such a shim -- sometimes we will want to break backward compatibility, either because the shim would be unacceptably complex, or because we need to deprecate an old piece of functionality, especially something insecure or that would get int he way of scaling the network.

- [GitHub Issue](https://github.com/urbit/urbit/issues/6073)
