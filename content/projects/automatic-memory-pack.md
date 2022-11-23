+++
title = "Automatic Memory Pack/Trim/Meld"
arcs = ["Zero-click Maintenance"]
duration = "TBD"
manpower = "TBD"
status = "Future"
owner = "TBD"
description = """

"""
+++

Right now, the available memory reclamation routines (pack, trim, and meld) need to be run manually.  Instead, they should run automatically, either triggered by heuristics (e.g. a high-water mark of memory use during an event) or run on a timer.  This will reduce maintenance burden.

Memory-efficient meld is less risky to automate, so this has a soft dependency on that.
