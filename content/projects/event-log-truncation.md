+++
title = "Event Log Truncation"
start_date = "2021-01-01"
end_date = "2022-12-01"
lead = "~master-morzod"
status = "Current"
+++

Event log truncation is a basic feature of "prevalence systems" such as Urbit's, to ensure disk usage stays roughly constant over time instead of increasing linearly as it does now.

Implementing event log truncation required first moving the responsibility for managing the event log from Vere's "Urth" I/O process to its "Mars" Nock worker process, colocating event log persistence with snapshot persistence to ensure consistency when deleting old events from the log.
