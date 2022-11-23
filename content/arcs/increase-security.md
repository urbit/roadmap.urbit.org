+++
title = "Improve Security"
color = "#000000"
+++


Much work remains to bulletproof Urbit to the point where it can not only defend its memory safety and cryptographic safety, but can also fend off denial of service attacks by dedicated assailants.  We will start raising the bar for security incrementally to be resilient against increasingly determined and well-resourced attackers.

Securing Urbit breaks down coarsely into:

- securing the software supply chain ("the components, activities, and practices involved in the creation and deployment of software"),
- mitigating denial of service attacks ("malicious attempts to overwhelm an online service and render it unusable"), and
- preventing penetration (e.g. corrupting memory to hijack the virtual machine).

We will first secure the system against an individual or small group intending to casually DoS the network by spamming packets.  This work will largely consist of many small modifications to process incoming packets more efficiently, improve monitoring and incident response, and ban malicious IP addresses and Urbit ships.

Tlon is developing an incident response plan, and basic logging is being developed, which is the first step in DoS protection.  The next step in DoS protection is to validate incoming Ames packets in Vere -- also a high priority.

Concurrently, we will tighten down intra-Arvo security.  Once two known issues are addressed -- by adding a basic userspace permissioning system and closing a vulnerability known as the "zapgal type hole" -- Arvo should be secure against penetration, assuming a secure runtime.  Mitigating DoS in Arvo and all its userspace agents will require more work, including interaction with Vere.

Along with tightening Arvo security and basic DoS protection, basic software supply chain protection is being established.  This entails using best practices for managing permissions to interact with infrastructure nodes (live galaxies and stars) and places that distribute software, including Urbit's GitHub repository and the HTTP endpoints from which executables -- Vere binaries and "pills" (Nock bootloaders) -- are downloaded.  We will also need to build protections against DNS spoofing that would allow an attacker to feed a ship bunk PKI data from a fake Ethereum node.

Defending the system against an experienced team determined to find memory corruption in the runtime to gain remote code execution will require the most lead time.  We can start on this soon by improving the quality of the architecture and code in the most critical parts of the runtime; we also plan to experiment with "design for verification", i.e. structuring the code to be amenable to pen-and-paper correctness proofs, so that we can begin preparing the code for external audit and penetration testing.

The Nock interpreter (bytecode interpreter, jet dashboard, and allocator) is the most difficult part of the system to secure.  The first step toward guaranteeing its security may be to simplify its architecture so it can be more effectively analyzed and verified.  Splitting out the I/O drivers into their own processes and dropping privileges will add some defense in depth to Vere and increase flexibility of implementation; that work is planned for relatively soon.

Here is a list of security tasks ordered within each category in roughly increasing order by level of vulnerability:

- PKI Security:
  - Azimuth PKI contracts: audited, mature
  - JavaScript client security: somewhat mature, but unverified
- Arvo security:
  - Ames cryptosuite: audited, somewhat mature, missing forward secrecy
  - basic kernel security: small attack surface
  - kernel protection against agents: requires userspace permissioning and zapgal type hole closing; otherwise, small attack surface
- Vere security:
  - deserialization ("+cue"): unverified but small
  - jet memory safety: unverified
  - IPC safety: unverified
  - tools (`|meld`, `|pack`, `|mass`, `|trim`) safety: unverified
  - allocator soundness: unverified, somewhat difficult to verify
  - jet dashboard soundness: unverified, difficult to verify
  - bytecode interpreter soundness: unverified, difficult to verify
  - I/O driver security: likely vulnerable, should be split out into subprocesses, maybe rewritten in a memory-safe language
  - dropping Unix process privileges: not implemented
  - encryption at rest for event log and snapshot: not implemented
- Software Supply Chain Security:
  - in-Urbit software distribution: protected by Ames authenticated encryption, but no code signing, so it's vulnerable when redistributed by another ship
  - GitHub repo permissions: established recently
  - infrastructure nodes (live galaxies) permissions: established recently
  - protection against Ethereum node DNS spoofing: none
  - protection against malicious pill or Vere binary distribution: none
  - kernel source code attestation: none
- Denial of Service Protection:
  - Vere packet-level DoS protection: minimal (just basic authenticated encryption)
  - Arvo DoS protection: minimal (just `|ruin`)
  - incident response plan: none
  - telemetry for DoS-related packet statistics: none