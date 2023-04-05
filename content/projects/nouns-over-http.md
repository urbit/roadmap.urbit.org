+++
title = "Use Nouns over HTTP"
arcs = ["Improve Developer Experience"]
end_date = "2023-04-25"
duration = "1 Month"
manpower = "1 Engineer"
status = "Current"
owner = "~palfun-foslup"
description = """
Eyre, Urbit's HTTP server, only supports communicating using JSON at the moment.  Using "jammed" (serialized) nouns over HTTP would move JSON conversion logic from the server to the client, allowing a fully featured Gall agent to be written, including communication with a web client, without needing to write JSON conversions in Hoon.
"""
+++

Eyre, Urbit's HTTP server, only supports communicating using JSON at the moment.  Using "jammed" (serialized) nouns over HTTP would move JSON conversion logic from the server to the client, allowing a fully featured Gall agent to be written, including communication with a web client, without needing to write JSON conversions in Hoon, which are tedious to write and have performance problems.

`~palfun-foslup` has a draft PR for this work:
https://github.com/urbit/urbit/pull/5877

Once merged, this PR should improve developer experience and could have positive implications for performance.  This will be especially powerful when combined with native noun handling in various other languages.
