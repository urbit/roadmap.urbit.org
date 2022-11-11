+++
title = "HTTP Scrying"
duration = "TBD"
manpower = "TBD"
status = "Future"
lead = "TBD"
+++

The scry namespace should be made available over HTTP, to improve developer experience and performance for Urbit clients ("airlocks").  This likely looks like carving out a subset of URL paths (maybe those that start with `/scry`, or similar) to be reserved for scry requests, and the rest of the URL would be a scry path.

This will allow the runtime to intercept these requests, and instead of injecting the request as an Arvo event, it can scry into Arvo for the response.  This saves a disk write, and the runtime could also cache the response so that future requests for that path don't even run Nock.

If this is done well enough, it could lead to the development of HTTP-based thin-client "scry browsers" (UDP-based scry browsers generally require `libames`) that can explore a ship's state, and maybe even serve an auto-generated interface, with minimal client-side logic and state.
