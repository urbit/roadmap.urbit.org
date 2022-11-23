+++
title = "Outer HMACs on Packets for DDoS Protection"
arcs = ["Increase Security"]
duration = "1-3 Months"
manpower = "1 Engineer"
status = "Future"
owner = "TBD"
description = """
Ames packets need to be decrypted to be authenticated.  Wrapping the packet in an HMAC would let the receiver discard unauthenticated packets faster, improving DoS resilience.
"""
+++

Ames packets need to be decrypted to be authenticated.  Wrapping the packet in an HMAC would let the receiver discard unauthenticated packets faster, improving DoS resilience.
