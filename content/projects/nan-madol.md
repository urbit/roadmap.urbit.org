+++
title = "Nan Madol"
arcs = ["Improve Network Performance"]
spec = "https://gist.github.com/belisarius222/4ae249c07d9e169b38b4e9f57e0eced4"
duration = "TBD"
manpower = "TBD"
lead = "TBD"
status = "Future"
description = """
A far-out proposal is to have the runtime perform serialization, packetization, encryption, and congestion control, instead of Arvo.
"""
+++

A far-out proposal is to have the runtime perform serialization, packetization, encryption, and congestion control, instead of Arvo.  This would be a big conceptual shift and has risks associated with that, but it would massively increase network bandwidth and it would be a big step toward making Ames a true overlay network, by making it more transport-agnostic.

Alternatives to this project include using a scry-based effect system in Vere, which smart runtimes could retrieve in batches.  This might dovetail with new timer and event deferral systems too.
