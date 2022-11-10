+++
title = "Static Gall"
date = "2019-12-01"
contributors = ["~wicdev-wisryt"]
status = "Completed"
+++

## Old Gall

Gall agents have so-far been difficult to write. People try to avoid writing
them; experienced hoon developers write large monolithic ones when they must,
and those still learning have no chance to write a simple Gall agent the way
they can write a simple generator. It's absolutely critical that it be easy to
write good Gall agents. Urbit has to be a good platform for developers, and that
operates on two levels:

1. It's important to be able to easily create small Gall agents to do small
   things. Writing a Python script to retrieve Bitcoin prices and post them to
   a Slack channel is fairly quick and easy. It's important that it be
   similarly easy to do that in Urbit, because that's half the fun of having
   your own computer - you can make it do stuff easily. Right now, those still
   learning Hoon get used to generators, but the learning curve between
   generators and Gall agents is huge. They should be building tiny agents
   almost as fast as they're building tiny generators.

2. Developers need to be able to write large, modular apps. Right now, we
   create large monolithic apps routes going every which-a-way. Hood tries to
   split these into a few libraries, but it's still convoluted. The result is
   that we create many interlocking state machines in a single agent, and any
   agent that's bigger than a thousand lines of code becomes difficult to
   maintain soon after release.  Instead, if Gall agents are easy to write,
   then we can use Gall to keep these state machines separate and route between
   them. Many apps should be composed of several smaller agents, each of which
   just maintains its own state and pub/sub interface.

Now let's look at the worst parts of writing Gall agents for an experienced Hoon
developer:

### Arms

Gall apps have many (dozens) of optional arms. These are very diffcult to
discover, either in source code or documentation. Here's some of them:

- `++noun-poke` is called for a noun, otherwise `++poke-[mark]` takes marked
  input of mark `[mark]`.
- `++peer` is called when someone subscribes, unless there's a more specific
  `+peer-[subscription-path]` which matches the first part of the subscription
  path.
- `+peek` is called when some calls `.^` on the agent, unless it has a `care`
  and it matches a more specific `++peek-[care]`, unless there's a more
  specific `++peek-[care]-[scry-path]` that matches the first part of the scry
  path.
- `++sigh` is called for an HTTP response, unless there's a `++sigh-[mark]`
  that matches the mark of the response, unless there's a
  `++sigh-[mark]-[wire]` which matches the first part of the wire.
- `++wake` is called when a timer fires, unless there's a `++wake-[wire-path]`
  which matches the first part of the wire.
- `++diff` is called when there's a subscription response, unless there's
  `++diff-[mark]` where `[mark]` is the mark of the response, unless there's
  `++diff-[mark]-[wire]`.

Additionally, there's a number of types of responses an agent could get from
Arvo, they all can take a partial wire, and some of them have extra information.
And this is just for the name! The arguments to these functions are all
different as well and depend on how much information you specified in the name.
There's no types that specify these, and there's no central documentation.
There's only two ways to guess these arm names: find an agent that already uses
the one you want, or read the Gall code, which is very complex.

### Abstraction

Specifying so much in the arm name is only useful for writing monolithic apps,
but it makes abstraction extremely difficult. You can't plug in libraries that
need to make asynchronous requests without threading the responses to their
specific requests back to them (you have to know which cards they expect in
response), which is an awful violation of encapsulation.

You can't create a little library function to generate easy agents. Your library
functions can only go inside these complicated arms, so they can't help you deal
with that complexity.

### Cards

The cards you can send to the system (the available system calls) are also
difficult to discover. Some are passed through with no change, like setting
timers in Behn. Some are simply blocked by Gall. Many are modified in important
but non-obvious ways. HTTP requests, for example, have all kinds of things done
to them. Many cards that take a vase on the Arvo level don't need one in a Gall
agent.

These are all good changes, and Gall agents shouldn't use the same interface
that Vanes do. However, if you want to know a Vane's Vane-level interface, you
can just look at the type in `zuse.hoon`. If you want to know a Vane's
Gall-level interface, you're reduced to grepping for card names in Gall and
trying to read complicated vase manipulation code.

### Subscriptions

Gall agents are designed around a pub/sub model, but pushing out an update to
subscribers involves about 10 lines of convoluted `map`/`murn`/`roll`/`zing`
operations.

## New Gall

The new Gall agent design introduced in the "static Gall" update addresses many
of the issues described above:

- The convoluted system of arms is replaced with just ten fixed arms.
- All possible cards you can send are simplified and clearly defined.
- Subscription logic is now much simpler: you just send updates out to your
  subscription paths rather than dealing with bones for individual subscribers.
- An agent is now clearly defined as an `agent:gall` type. This makes it easy
  for libraries to ingest agents, add functionality, automatically generate
  agents, etc.

Here is the new type definition of a Gall agent:

```hoon
++  agent
  =<  form
  |%
  +$  step  (quip card form)
  +$  card  (wind note gift)
  +$  note
    $%  [%agent [=ship name=term] =task]
        [%arvo note-arvo]
        [%pyre =tang]
    ==
  +$  task
    $%  [%watch =path]
        [%watch-as =mark =path]
        [%leave ~]
        [%poke =cage]
        [%poke-as =mark =cage]
    ==
  +$  gift
    $%  [%fact paths=(list path) =cage]
        [%kick paths=(list path) ship=(unit ship)]
        [%watch-ack p=(unit tang)]
        [%poke-ack p=(unit tang)]
    ==
  +$  sign
    $%  [%poke-ack p=(unit tang)]
        [%watch-ack p=(unit tang)]
        [%fact =cage]
        [%kick ~]
    ==
  ++  form
    $_  ^|
    |_  bowl
    ++  on-init
      *(quip card _^|(..on-init))
    ::
    ++  on-save
      *vase
    ::
    ++  on-load
      |~  old-state=vase
      *(quip card _^|(..on-init))
    ::
    ++  on-poke
      |~  [mark vase]
      *(quip card _^|(..on-init))
    ::
    ++  on-watch
      |~  path
      *(quip card _^|(..on-init))
    ::
    ++  on-leave
      |~  path
      *(quip card _^|(..on-init))
    ::
    ++  on-peek
      |~  path
      *(unit (unit cage))
    ::
    ++  on-agent
      |~  [wire sign]
      *(quip card _^|(..on-init))
    ::
    ++  on-arvo
      |~  [wire sign-arvo]
      *(quip card _^|(..on-init))
    ::
    ++  on-fail
      |~  [term tang]
      *(quip card _^|(..on-init))
    --
  --
```

All existing Gall agents have been rewritten for the new static Gall paradigm.

## More info

- [Pull request on Github](https://github.com/urbit/urbit/pull/1996)
- [Gall overview](https://urbit.org/docs/arvo/gall/gall) - This section of the
  Arvo documentation explains the new design of Gall in great detail.
