+++
title = "HTTP Scrying"
arcs = ["Improve Network Performance"]
duration = "2-3 Months"
manpower = "1-2 Engineers"
status = "Future"
owner = "TBD"
description = """
The scry namespace should be made available over HTTP, to improve developer experience and performance for Urbit clients ("airlocks").
"""
+++

The scry namespace should be made available over HTTP, to improve developer experience and performance for Urbit clients ("airlocks").  This likely looks like carving out a subset of URL paths (maybe those that start with `/scry`, or similar) to be reserved for scry requests, and the rest of the URL would be a scry path.  Note that mark-converting the scry result to `%mime` will likely be required for inclusion in an HTTP response.  Also, a subset of this functionality already exists, for `%gx` scrys into Gall.

Adding this feature will allow the runtime to intercept these requests, and instead of injecting the request as an Arvo event, it can scry into Arvo for the response.  This saves a disk write, and the runtime could also cache the response so that future requests for that path don't even run Nock.

If this is done well enough, it could lead to the development of HTTP-based thin-client "scry browsers" (UDP-based scry browsers generally require `libames`) that can explore a ship's state, and maybe even serve an auto-generated interface, with minimal client-side logic and state.
