+++
title = "Consolidate Packet Re-Send Timers"
duration = "1 Month"
manpower = "1 Engineer"
status = "Future"
lead = "TBD"
+++

Ames sets a lot of timers to remind it to send packets again if they don't get acknowledged fast enough.  Reducing the number of timers lowers disk write usage, improves quiescence (which should eventually let hosting providers use less RAM and thereby lower costs), and should improve overall performance on publisher ships.

The low-hanging fruit is to mark timers as "dead" if the ship they're re-sending packets to haven't been heard from in a while, then have one global re-send timer for these "dead" peers.  For a ship hosting a large group, this could reduce the number of Arvo events per minute by 10x or more.

This is a purely Arvo change.
