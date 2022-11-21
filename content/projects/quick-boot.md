+++
title = "Quick Boot"
start_date = "2022-07-01"
end_date = "2022-12-15"
lead = "~nidsut-tomdun"
status = "Current"
description = """
The "quick boot" project aims to bring initial Urbit boot time down from ~10 minutes to well under a minute.
"""
+++

The "quick boot" project aims to bring initial Urbit boot time down from ~10 minutes to well under a minute.  This is short enough to make a material impact on adoption, since if a user gets bored while waiting for a ship to boot, they're much more likely to forget about it and never complete the onboarding.  This is useful for hosting providers, CI testing, and developer experience.  It has been worked on for a few months, and the first few steps are complete.  One of the last steps, now written and in the testing phase, is to make Ford caches portable between ships.

PR: https://github.com/urbit/urbit/pull/6044
Issue: https://github.com/urbit/urbit/issues/6020
