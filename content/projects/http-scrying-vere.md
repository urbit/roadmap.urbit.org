+++
title = "HTTP Scrying: Vere"
arcs = ["Make Urbit Fast"]
duration = "2 weeks"
manpower = "1 developer"
status = "Next Up"
owner = "~watter-parter"
description = """
This greatly improves the performance of HTTP scrying.
"""
+++

Allow the runtime to intercept HTTP scry requests, and instead of injecting the request as an Arvo event, it can scry into Arvo for the response.  This saves a disk write, and the runtime could also cache the response so that future requests for that path don't even run Nock.
