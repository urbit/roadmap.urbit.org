+++
title = "Native UI Research: Test-type"
arcs = ["Improve Developer Experience"]
duration = "3 Months"
status = "Future"
owner = "~hastuc-dibtux"
manpower = "1 Developer"
description = """
One of the main barriers to writing an Urbit app is that the standard way to present a user interface is by writing it in JavaScript that runs in a web browser.  This has advantages, but it requires writing code in two languages, and it means you can't stay in Urbit entirely when writing an app. This phase of the work involves allowing hoon UI specifications to be rendered to a browser
"""
+++

This stage of the research involves writing a renderer to convert hoon UI to a single page application running in the browser. This has various sub-tasks as it is the first time that the hoon UI datastructure will be making the leap to unconstrained 2D graphics.

Sub-tasks:
- JSON conversion
- Algorithms for laying out arbitrary hoon UI nodes in 2D space
- Deeper specifications of the "component jets" idea
- Dealing with a client/server split, including optimistic mutations, handling network fetching
- Standardisation of supported marks for the %value attribute

It is expected that the spec will be reasonably final by the time that this stage is finished.


