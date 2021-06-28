# Release Process

This document describes process to release and publish a new version of this module.

**Please note in order to be able to release a new version make sure you have preinstalled Git
and cloned this repository.**

1. Bump the version number in `package.json`.

2. Create a new Git tag/release named with the same version as in `package.json` but with `v` prefix, e.g. `v0.5.0`.

3. Wait until GitHub Action checks finished, if status is successful you are good, otherwise if status is failed, check error(s), and redo all the steps again, until status is successful.
