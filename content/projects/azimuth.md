+++
title = "Azimuth"
date = "2019-01-01"
contributors = ["one", "two"]
status = "Completed"
+++

In Urbit's early stages, when it was still highly experimental, the address
space was managed and issued manually by Tlon. In 2017, it was decided that
Urbit's address space would be moved to a smart contract on Ethereum ([see the
blog post for
details]((https://urbit.org/blog/bootstrapping-urbit-from-ethereum))), so
address owners would truly own and control their Urbit IDs. Over the next year
the system was designed, built and audited, and in early 2019 Urbit's PKI system
called [Azimuth](https://urbit.org/docs/glossary/azimuth) was launched on the
Ethereum blockchain.

On Azimuth, Urbit IDs (e.g. `~sampel-palnet`) exist as ERC-721 NFTs. They can
be held in ordinary Ethereum wallets, or they can be held by a "Master Ticket".
A master ticket is a seed phrase from which a wallet is deterministically
derived. Users can manage their Urbit ID (spawn planets, transfer ownership,
reset networking keys, perform a factory reset, etc) through
[Bridge](https://bridge.urbit.org/), Urbit's UI for Azimuth.

As well as the Ethereum contracts and Bridge, a number of apps have been
developed which run on users' ships. These keep up-to-date with the PKI on
Azimuth and update [Jael](https://urbit.org/docs/glossary/jael) (the PKI Vane)
so you can communicate with other ships.

## More info

- [2017 blog post about the decision to use Ethereum](https://urbit.org/blog/bootstrapping-urbit-from-ethereum)
- [2019 blog post announcing Azimuth is live](https://urbit.org/blog/azimuth-is-on-chain)
- [Initial Azimuth transaction on Etherscan](https://etherscan.io/tx/0x53b8310bdd9331c1c163ef8e232645cf5abbd7b02d2d2acd64c05ccdbf80755e)
- [Azimuth technical documentation](https://urbit.org/docs/azimuth/azimuth)
- [Azimuth repo on Github](https://github.com/urbit/azimuth)
- [Details of security audits](https://urbit.org/audits)