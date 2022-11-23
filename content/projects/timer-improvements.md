+++
title = "Timer Improvements"
arcs = ["Zero-click Maintenance", "Improve Network Performance", "Reduce Hosting Costs"]
duration = "TBD"
manpower = "TBD"
status = "Future"
owner = "TBD"
description = """
Urbit's timer system could be better in several ways.  
"""
+++

Urbit's timer system could be better in several ways.  As it stands, it's hard to ensure Arvo crashes don't break future timers.  Worse, one broken timer can break all the other ones, even unrelated timers.

In addition to correctness issues, there are also performance improvements to be had.  The current design doesn't allow pipelining timer events so that their disk writes can be batched to improve performance.  Also, if the timer requests were more legible to the runtime, the runtime could handle different kinds of timers differently to facilitate quiescence.

In particular, if Vere could tell a timer was an Ames packet re-send timer, it could find the packet the timer refers to, and instead of waking up Arvo each time the packet needs to be sent again, Vere could assume responsibility for re-sending, while the Arvo state could remain on disk, reducing average RAM usage and thereby reducing hosting costs.
