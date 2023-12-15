+++
title = "Jet Dashboard Experiments"
arcs = ["Zero-click Maintenance","Improve Security"]
manpower = "1-2 Developers"
duration = "2-4 Months"
owner = "~master-morzod"
status = "Next Up"
description = """
Experimenting with different designs for the jet dashboard could improve performance, security, and general simplicity of the codebase.
"""
+++

The jet dashboard is the system in the runtime that registers, validates, and runs jets: specific pieces of Nock code reimplemented in C for performance.  Experimenting with different designs for the jet dashboard could improve performance, security, and general simplicity of the codebase.  Backporting Ares's "subject knowledge analysis" Nock static analysis technique to Vere could be part of this work.
