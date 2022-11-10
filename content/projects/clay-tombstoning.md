+++
title = "Clay Tombstoning"
date = "2022-06-01"
contributors = ["~wicdev-wisryt"]
status = "Completed"
+++

[Clay](https://urbit.org/docs/glossary/clay), the filesystem
[Vane](https://urbit.org/docs/glossary/vane), is version-controlled in a similar
manner to Git. Previously, it has not been possible to delete files in old
revisions. This made it difficult to distribute large blob-like files which
change frequently, such as minified Javascript for front-ends, because they'll
be duplicated on each change and bloat a ship's state.

A new feature, tombstoning, has been introduced to solve this. Files in all
revisions before the current one may be "tombstoned" - the old data is deleted
and just the reference remains. Tombstoning policy can be configured for files,
directories, etc, so that large files aren't duplicated while full revision
history can be retained for other things where it's appropriate.

This lays the groundwork for moving the management of front-end resources back
into Clay from where they currently reside in the `%docket` agent. Longer-term,
tombstoning will make large file storage practical, in combination with off-loom
storage.

## More info

- [Clay tombstoning PR on Github](https://github.com/urbit/urbit/pull/5408)
- [Arvo release on Github](https://github.com/urbit/urbit/releases/tag/urbit-os-v2.123)
