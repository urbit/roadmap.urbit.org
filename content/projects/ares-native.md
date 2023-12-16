+++
title = "Ares: Native Code"
arcs = ["Make Urbit Fast"]
status = "Future"
owner = "~ritpub-sipsyl"
description = """
Compile Nock to native machine code instead of interpreting a bytecode.
"""
+++

The first version of Ares has a "codegen interpreter", i.e. an interpreter for a custom low-level language that was the result of running subject knowledge analysis on Nock.  The next, faster step is to condense the "codegen" into a custom bytecode that 
