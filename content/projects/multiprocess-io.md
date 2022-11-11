+++
title = "Multiprocess I/O"
duration = "2-3 Months"
manpower = "1 Engineer"
status = "Future"
lead = "TBD"
+++

We intend to split the Urth I/O process into multiple processes -- one dispatcher process and one process for each I/O driver.  This establishes more security bulkheads between subsystems, it lets each I/O driver be written in a different programming language, and it will facilitate running some I/O processes on other machines in a future cloud host environment.

Note that without shared memory IPC, this will likely slow down the system.