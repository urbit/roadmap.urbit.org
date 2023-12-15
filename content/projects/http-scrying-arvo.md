+++
title = "HTTP Scrying: Arvo"
arcs = ["Improve Network Performance"]
date = "2023-09-19"
status = "Completed"
contributors = ["~watter-parter"]
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0106.md"
description = """
This makes the scry namespace available over HTTP enables reads of Urbit data from the clearweb.
"""
+++

The scry namespace should be made available over HTTP, to improve developer experience and performance for Urbit clients ("airlocks").  This likely looks like carving out a subset of URL paths (maybe those that start with `/scry`, or similar) to be reserved for scry requests, and the rest of the URL would be a scry path.  Note that mark-converting the scry result to `%mime` will likely be required for inclusion in an HTTP response.  Also, a subset of this functionality already exists, for `%gx` scrys into Gall.

If this is done well enough, it could lead to the development of HTTP-based thin-client "scry browsers" (UDP-based scry browsers generally require `libames`) that can explore a ship's state, and maybe even serve an auto-generated interface, with minimal client-side logic and state.

Adding runtime support, which makes this performant, is a subsequent line of
work tracked [here](/project/http-scrying-vere).

- [Pull Request](https://github.com/urbit/urbit/pull/6741)
