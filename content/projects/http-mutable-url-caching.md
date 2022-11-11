+++
title = "HTTP Mutable URL Caching"
duration = "TBD"
manpower = "TBD"
lead = "TBD"
status = "Future"
+++

Urbit should be able to serve websites at custom URLs efficiently to support serving websites to the old web from a single ship without needing to configure caching reverse proxies such as nginx or varnish.

Vere will maintain a cache mapping from URL to response, and Arvo will invalidate cache entries when the application wants to serve an updated response at that URL.

This is in development:
https://github.com/urbit/urbit/pull/5927