+++
title = "HTTP API"
date = "2021-02-01"
contributors = ["~radbur-sivmus"]
status = "Completed"
+++

`@urbit/http-api` is an NPM package which makes it easy to talk to an Urbit ship
from a web browser. Eyre's channel system and scry interface are implemented in
full. You can authenticate, poke, scry, and subscribe to Gall agents running on
a ship with simple method calls to an instance of the `Urbit` class it contains.
The package also manages the EventSource object and event acknowledgements for
you, so you can give it a callback for handling events and just deal with the
JSON data as it arrives.

This makes it much simpler to develop web apps that integrate with Urbit.

## More info

- [`http-api` in the Urbit Github repo](https://github.com/urbit/urbit/tree/master/pkg/npm/http-api)
- [`http-api` documentation](https://developers.urbit.org/guides/additional/http-api-guide)
- [Pull request on Github](https://github.com/urbit/urbit/pull/4338)
