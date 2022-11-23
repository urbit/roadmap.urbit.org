+++
title = "Improve Network Performance"
color = "#219DFF"
+++

An ordinary Urbit ship needs to be able to host a large chatroom, in addition to other scaling considerations.  The performance of Urbit's networking is the bottleneck limiting this kind of scaling at the moment.

A number of incremental improvements need to be made to the implementation of Ames, Urbit's networking protocol, including fixes for flaky connections and more efficient use of timers.  A second protocol called Fine will also be added for scalable content distribution.  A multi-part project called "subscription reform" will allow apps to use this protocol effectively.
