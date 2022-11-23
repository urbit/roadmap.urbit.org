+++
title = "Forward Secrecy Ratchet in Ames"
arcs = ["Increase Security"]
manpower = "1-2 Engineers"
duration = "3-6 Months"
owner = "TBD"
status = "Future"
description = """
Ames has no forward secrecy other than manual on-chain key rotation.  This means if an attacker finds the symmetric key between two ships or one of the private keys, they could decrypt the whole history of communication between those ships.
"""
+++

Ames has no forward secrecy other than manual on-chain key rotation.  This means if an attacker finds the symmetric key between two ships or one of the private keys, they could decrypt the whole history of communication between those ships.

For damage control, Ames should add a cryptographic ratchet to limit the number of messages exposed by any pwned key.  Note that encrypted remote scry does its own key rotation, whose security should mostly be evaluated separately.