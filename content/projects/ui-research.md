+++
title = "Native UI Research: Alpha"
arcs = ["Improve Developer Experience"]
start_date = "2023-01-30"
end_date =" 2023-04-15"
status = "Current"
owner = "~hastuc-dibtux"
manpower = "TBD"
description = """
One of the main barriers to writing an Urbit app is that the standard way to present a user interface is by writing it in JavaScript that runs in a web browser.  This has advantages, but it requires writing code in two languages, and it means you can't stay in Urbit entirely when writing an app.
"""
+++

One of the main barriers to writing an Urbit app is that the standard way to present a user interface is by writing it in JavaScript that runs in a web browser.  This has advantages, but it requires writing code in two languages, and it means you can't stay in Urbit entirely when writing an app.

An "Urbit-native UI system" would alleviate this issue by providing an Urbit-based language for defining user interfaces.  This is a broad remit -- such a language might be a subset of Hoon, a superset of Hoon, a noun layout that's a compilation target of a new language, or even something else.  The important thing is that it would extend the feel of Urbit development into user interface development.  In practice, this likely means the language and framework will make heavy use of concrete data, state functions, the scry namespace, and solid-state publications.

This stage of the research involves writing a spec for a hoon-based interface description datastructure, and a renderer to convert this interface description to a terminal-based ncurses TUI. Progress can be tracked [here](https://github.com/liam-fitzgerald/goon).

