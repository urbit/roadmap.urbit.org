+++
title = "Demand Paging"
arcs = ["Increase Runtime Data Capacity", "Reduce Hosting Costs"]
duration = "1-3 Months"
manpower = "1 Engineer"
owner = "~fanfun-mocbud"
status = "Current"
description = """
Demand paging refers to the ability to load only needed pages of memory into RAM, leaving other pages on disk, to reduce memory use.  Operating systems almost always include this feature.  Urbit does not include it yet, but it will need to, since Urbit is a "single-level store".
"""
+++

Demand paging refers to the ability to load only needed pages of memory into RAM, leaving other pages on disk, to reduce memory use.  Operating systems almost always include this feature.  Urbit does not include it yet, but it will need to, since Urbit is a "single-level store".

Once Urbit is capable of storing enough data that it can't fit in RAM -- somewhere between 4GB and 16GB on most modern machines -- demand paging will be necessary for basic functionality.  Even before then, reducing the amount of data resident in RAM will reduce costs for running Urbit in the cloud, where RAM is the most expensive resource Urbit consumes.
