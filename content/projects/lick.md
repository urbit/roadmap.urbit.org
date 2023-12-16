+++
title = "%lick: an IPC vane"
arcs = ["Increase Capability"]
spec = "https://github.com/urbit/UIPs/blob/main/UIPS/UIP-0101.md"
date = "2023-06-22"
contributors = ["~mopfel-winrux"]
status = "Completed"
description = """
The %lick vane enables communication between Urbit applications and applications operating on the host operating system.
"""
+++

%lick is designed to function as an Interprocess Communication (IPC) vane. It enables communication between Urbit applications and applications operating on the Host Operating System (Host OS). Urbit applications, through this vane, can open and close IPC ports on the Host OS, receive notifications about POSIX applications' connectivity status, and transfer jammed nouns.

## Motivation

The primary incentive behind this proposal is to empower Urbit applications to interact directly with Host OS processes, bypassing the need for %eyre. This capability facilitates communication with a diverse array of devices, including cryptographic hardware keys, dongles, embedded devices utilizing common communication interfaces (such as UART, SPI, I2C), and IoT-connected devices.

The communication between Urbit apps and the Host OS will employ nouns shaped as [=mark =noun]. An alternative design involving ioctl was explored but discarded due to security and compatibility concerns.

## Code

%lick was deployed to the network in the 412K release.

- [PR](https://github.com/urbit/urbit/pull/6519)
- [Release](https://github.com/urbit/urbit/releases/tag/412k)
