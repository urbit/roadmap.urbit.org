+++
title = "Versioned Pokes and Subscriptions"
arcs = ["Zero-click Maintenance","Improve Backward Compatibility"]
spec = "https://github.com/urbit/plan/blob/master/oort/infra-offsite/versioned-marks.txt"
duration = "4-8 Months"
manpower = "1-2 Developers"
status = "Future"
owner = "TBD"
description = """
Standardizing application protocol versioning in the kernel should improve developer experience and lead to more applications behaving correctly across upgrades, thereby improving user experience too.
"""

+++

Standardizing application protocol versioning in the kernel should improve developer experience and lead to more applications behaving correctly across upgrades, thereby improving user experience too.

Urbit applications have a more difficult versioning problem to solve than traditional centralized applications: the dev can't just turn off the servers and reboot them all with the new version.  Instead, any given user ship might or might not update its installation of this application -- and some ships might decide never to update.

For an Urbit application to provide a good user experience across upgrades, it needs to have good answers for all four squares of the compatibility matrix:
Easy:
- new publisher -> new subscriber
- old publisher -> old subscriber
Hard:
- new publisher -> old subscriber
- old publisher -> new subscriber

Tlon's Landscape suite was the first set of applications to establish development patterns to handle this versioning reliably.  The push and pull hook libraries embed this pattern, among other features.  The general answer is to add a version number to each publication and perform an explicit version negotiation to determine the latest version that both sides understand.

Instead of the push and pull hook libraries, the kernel should handle this version negotiation for applications.  The developer should only need to write a couple of migration functions describing the application-specific parts of the upgrade, and the kernel will handle the version negotiation.