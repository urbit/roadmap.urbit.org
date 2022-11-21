+++
title = "New Mars"
start_date = "2022-01-01"
end_date = "2024"
lead = "~ritpub-sipsyl"
status = "Current"
description = """
New Mars is an experimental rewrite of the Nock interpreter intended for much higher performance. 
"""
+++

New Mars is an experimental rewrite of the Nock interpreter intended for much higher performance.  It includes its own noun allocator, Nock -> machine code compiler, and incremental snapshot architecture, in addition to a new Nock static analysis system called "subject knowledge analysis", which has the potential to increase general Nock performance and also to streamline the jet dashboard (the system that checks whether a jet can be run instead of Nock), which is one of the most complex subsystems in current Vere.

Part of New Mars's snapshot architecture has already been backported to Vere.  We expect more of this research, possibly including subject knowledge analysis, to be amenable to backporting, increasing the short-term payoff of this long-term project and likely easing later integration.
