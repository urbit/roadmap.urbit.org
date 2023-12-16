+++
title = "HTTP Mutable URL Caching"
arcs = ["Improve Network Performance"]
date = "2023-03-29"
contributors = ["~watter-parter"]
status = "Completed"
description = """
Urbit should be able to serve websites at custom URLs efficiently to support serving websites to the old web from a single ship without needing to configure caching reverse proxies such as nginx or varnish.
"""
+++

Urbit should be able to serve websites at custom URLs efficiently to support serving websites to the old web from a single ship without needing to configure caching reverse proxies such as nginx or varnish.

Vere will maintain a cache mapping from URL to response, and Arvo will invalidate cache entries when the application wants to serve an updated response at that URL.

This is in development.  The first two phases of the grant have been
completed.  What remains is to implement a cache in Vere so Vere can
serve the webpages without sending requests to Arvo.

- [Grant](https://urbit.org/grants/eyre-scry)
- [PR](https://github.com/urbit/urbit/pull/5927)

