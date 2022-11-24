+++
title = "Improve Backward Compatibility"
class = "bg-wall-600"
+++

As it stands, every Kelvin change breaks backward compatibility, requiring app devs to publish modified code so their users can keep the app running.  This needs to happen less frequently over time, until eventually apps can be "write once, run forever."

The first step is to build scaffolding into the kernel so that compatibility shims can be added when a breaking change is released, so that app developers won't need to change their code to keep their apps running on newer kernels.

Even once it's possible to build a shim to run old apps, not every breaking change will include such a shim -- sometimes we will want to break backward compatibility, either because the shim would be unacceptably complex, or because we need to deprecate an old piece of functionality, especially something insecure or that would get int he way of scaling the network.

Within the next few years, we need to get to the point where future changes never necessitate deprecating old functionality.  This requires stabilizing the interface the kernel presents to applications, so that old features are worth committing to maintaining, and future changes to the interface will be small enough that writing shims is not onerous.

The interface can only be stabilized once a userspace permissioning system has been deployed, since it adds a new security layer, and we don't want to maintain old apps that don't have that security.  Before the interface can stabilize, apps also need an interface for publishing and requesting data to and from other ships that could plausibly be implemented by the kernel in a scalable manner -- the "subscription reform" project aims to provide this scalability.
