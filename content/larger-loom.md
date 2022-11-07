+++
title = "Larger Loom"
start_date = "2023-01-01"
end_date = "2023-04-01"
contributors = ["one", "two"]
status = "Future"
+++

The total size of a ship's loom (its total state in memory) is currently limited
to 2GB. This can become a problem as the size of a ship's state increases
with-long term usage. It also limits what kinds of apps can be built.

The New Mars project may make it possible to lift the loom size limit
completely. Additionally, there are other possible optimizations for the
existing runtime to increase the maximum loom size without a substantial
overhaul.