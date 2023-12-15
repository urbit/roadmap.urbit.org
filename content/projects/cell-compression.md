+++
title = "Pointer Compression: Cell Compression"
arcs = ["Increase Runtime Data Capacity"]
manpower = "1 Developer"
duration = "2-4 Months"
status = "Next Up"
owner = "TBD"
description = """
An optimization would be to ensure that any page of memory inside the "loom" (noun memory arena) stores only cells (pairs) or atoms (numbers). 
"""
+++

An optimization would be to ensure that any page of memory inside the "loom" (noun memory arena) stores only cells (pairs) or atoms (numbers).  This would reduce the size of each cell's allocation box from three 64-bit slots to two, since the size field before and after each cell could be removed -- every allocation box within that page would be the same size, since they're all cells.  Implementing this would also require adding a page table bitmap tracking which pages store cells and which store atoms.

This optimization would not increase the total size of addressed memory, but it would increase the number of cells that could be stored within that memory by 50%. This also compresses cell storage, increasing cache locality and thereby performance.   The majority of Urbit's memory consists of cells, so this optimization would meaningfully increase total data storage capacity.
