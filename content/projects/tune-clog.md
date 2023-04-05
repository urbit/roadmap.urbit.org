+++
title = "Tune %clog Backpressure Time and Space Constants"
arcs = ["Improve Network Performance"]
duration = "1 Week"
manpower = "1 Engineer"
start_date = "2022-06-05"
end_date = "2023-02-13"
status = "Completed"
owner = "~norsyr-torryn"
description = """
Tuning the constants in Ames's `%clog` system should reduce network flakiness, reduce the number of Arvo events, and improve publication bandwidth, especially until chat uses remote scry and solid-state subscriptions.
"""
+++

Tuning the constants in Ames's `%clog` system should reduce network flakiness, reduce the number of Arvo events, and improve publication bandwidth, especially until chat uses remote scry and solid-state subscriptions.

This has been implemented but needs review and testing before deployment.

- [PR](https://github.com/urbit/urbit/pull/5827)
