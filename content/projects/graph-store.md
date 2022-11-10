+++
title = "Graph Store"
date = "2020-07-01"
contributors = ["~tacryt-socryp"]
status = "Completed"
+++

Urbit has so-far has three main communication apps: Chat, Publish and
Collections. The back-end for each of these apps have been totally separate, and
they've each had different design approaches. With the release of Graph Store,
the back-ends of these apps are unified into a single model.

Graph store is a non-relational database suitable for use in building social
media applications. It is primarily designed for storing text-based content and
data that is generally threaded and nested. Currently just Chat, Publish and
Collections use it, but it is designed to be used by other developers to build
their own social media applications on Urbit. Micro-blogging, image boards,
forums, and all manner of other communication tools could be built on top of
Graph Store.

Graph Store is mainly in charge of two things: data storage and retrieval, and
schema validation. There are two related tools: Graph Push Hook, which provides
permissioning support to Graph Store and acts as a proxy layer to Graph Store
for outside ships to access, and Graph Pull Hook, which can be used to request
Graph Store data from other ships.

## More info

- [Graph Store docs](https://urbit.org/docs/userspace/graph-store/overview) -
  Comprehensive developer documentation and API reference for Graph Store.
- [Graph Store pull request on Github](https://github.com/urbit/urbit/pull/3110)
- [Graph Store release on
  Github](https://github.com/urbit/urbit/releases/tag/urbit-os-v1.0.37)
