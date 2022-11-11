+++
title = "Bitcoin Wallet"
date = "2021-05-27"
contributors = ["~timluc-miptev", "~novlud-padtyv", "~dinleb-rambep"]
status = "Completed"
description = """
The Bitcoin app is a non-custodial Bitcoin wallet which allows Urbit
users to send each other Bitcoin using their planet names.
"""
+++

The Bitcoin app is a non-custodial Bitcoin wallet which allows Urbit users to
send each other Bitcoin by simply entering the recipient's `@p` (e.g
`~sampel-palnet`).

Under the hood, the Bitcoin app is divided into two parts: Wallets and
Providers. A provider runs a full Bitcoin node and ElectRS indexer. An
additional small `node.js` proxy package allows Iris, Urbit's HTTP client
[Vane](https://urbit.org/docs/glossary/vane), to talk with the WebSocket
interface of ElectRS.

Other wallet users on the network can then subscribe to the provider. They'll
receive any transactions pertaining to their wallet addresses, and they can also
send new transactions to the provider, who'll transmit them to the Bitcoin
network.

For security reasons, the Bitcoin wallet is non-custodial. Instead, users can
sign transactions with their [master
ticket](https://urbit.org/using/id/hd-wallet), or copy a PSBT (partially signed
Bitcoin transaction) into a separate wallet and sign it there.

## More info

- [Bitcoin wallet launch livestream on
  Youtube](https://www.youtube.com/watch?v=_aRnfacZPto)
- [Bitcoin wallet pull request on Github](https://github.com/urbit/urbit/pull/4940)
- [Bitcoin RPC Github repo](https://github.com/urbit/urbit-bitcoin-rpc) - this
  includes the proxy and instructions for setting up a provider.
