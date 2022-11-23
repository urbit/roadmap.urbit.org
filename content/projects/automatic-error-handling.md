+++
title = "Automatic Error Handling on Replay"
arcs = ["Zero-click Maintenance"]
duration = "TBD"
manpower = "TBD"
status = "Future"
owner = "TBD"
description = """
If Vere hits a nondeterministic error on replay, it should retry instead of giving up and crashing. 
"""
+++

If Vere hits a nondeterministic error on replay, it should retry instead of giving up and crashing.  This retry should also run |trim, |pack, and |meld if needed, to ensure that the replay has at least as many resources as the original run.  This is important for making sure commit-before-compute is safe to replay in the presence of nondeterministic errors.
