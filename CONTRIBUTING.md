# Contributing Guidelines

First of all: Thank you for wanting to contribute to this project. To make this as easy as possible, our guidelines are
meant to be short and simple. We do, however, ask you to follow these guidelines to make it as simple as possible to
merge your contributions:

- Open issues to report bugs
- Use the GitHub Discussions feature to suggest features, ask questions, etc.
- Use your own branch/fork for changes
- Create a Pull Request when your changes are ready (or a draft pull request if you'd like an initial review)
- Be kind 😊

## Conventional Commits

This repository uses the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) standard to automate its
versioning, releases, etc.

**If you don't know about this standard, just ignore it.** Our maintainers will just squash and merge pull requests to
have a fitting commit message used for generating our changelog.

If, on the other hand, you do know about conventional commits, we greatly appreciate Pull Requests using them.
In this repository, we use the standard conventional commit syntax with breaking changes indicated by an `!` before the
`:` within the first line and a `BREAKING CHANGE: <Description>` footer. Commit types used within this repo are `feat`,
`fix`, `docs`, `refactor`, `style`, `perf`, and `chore`.

## Notes for maintainers

### Intended Release Cycle

When you want to release a new version, go to the _Actions_ Tab in the GitHub UI and choose the `Release` Action.
Then click `Run workflow`.

![image](https://user-images.githubusercontent.com/52416718/115860012-71cb7500-a420-11eb-9af1-d5faf0768f67.png)

This triggers the Release Action which automatically creates a Conventional Commit Release on GitHub.
