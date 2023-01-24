+++
title = "Improve Vere Build System"
arcs = ["Increase Release Frequency"]
start_date = "2022-11-01"
date = "2023-01-13"
owner = "~mastyr-bottec"
status = "Completed"
contributors = ["~mastyr-bottec","~fanfun-mocbud"]
description = """
Experiments are being conducted to extract Vere from the monorepo into its own git repository and replace the current Nix build setup with a new one based on the Bazel build system.
"""
+++

The build system for Vere has been the source of many headaches for years.  Experiments are being conducted to extract Vere from the monorepo into its own git repository and replace the current Nix build setup with a new one based on the Bazel build system.  If successful, these experiments could greatly reduce the amount of friction involved in Vere development, CI testing, and deployment, increasing the rate of development and releases.

Released in [Vere-v1.16](https://github.com/urbit/vere/releases/tag/vere-v1.16)
