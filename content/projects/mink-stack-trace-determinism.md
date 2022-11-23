+++
title = "+mink Stack Trace Determinism"
arcs = ["Improve Backward Compatibility"]
duration = "TBD"
manpower = "TBD"
status = "Future"
lead = "TBD"
description = """
If code run inside the `+mink` metacircular evaluation function in the Hoon standard library, which runs all userspace code, errors out deterministically (i.e. hits a trivial infinite loop in the Nock spec), then `+mink` catches the error and retursns a stack trace. 
"""
+++

If code run inside the `+mink` metacircular evaluation function in the Hoon standard library, which runs all userspace code, errors out deterministically (i.e. hits a trivial infinite loop in the Nock spec), then `+mink` catches the error and retursns a stack trace.  The problem is that to maintain determinism between runtimes, which might have different sets of jets, every jet needs to emit the same Nock hints that its equivalent Nock would have.  This is an error-prone and extremely onerous task.

Various designs have been proposed to ensure determinism, but none have been firmly chosen yet.  One design removes stack trace reporting from `+mink`, replacing the stack trace with null in case of error -- in this design, some out-of-band error notification mechanism would be needed to see the stack trace, such as hint-based logging.

A less restrictive design would limit `+mink`'s returned stack trace's contents to a subset intended to be easier for jets to replicate -- perhaps static text strings that don't refer to the runtime subject (environment).
