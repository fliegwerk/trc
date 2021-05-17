# Welcome to `@fliegwerk/trc` 👋

![Prerequisite](https://img.shields.io/badge/node-%3E%3D12-blue.svg)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://fliegwerk.github.io/trc)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/fliegwerk/trc/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/fliegwerk/@fliegwerk/trc)](https://github.com/fliegwerk/trc/blob/main/LICENSE)
[![Twitter: fliegwerk](https://img.shields.io/twitter/follow/fliegwerk.svg?style=social)](https://twitter.com/fliegwerk)

> A simple, bare-bones compiler for Typescript React projects, providing a configurable API

### 🏠 [Homepage](https://fliegwerk.github.io/trc)

## Prerequisites

- node >=12

## Install

```sh
npm install @fliegwerk/trc
```

## Usage

### CLI

#### Show help

```sh
$ trc --help
Options:
      --version  Show version number                                   [boolean]
  -w, --watch    Automatically rebuild on source change                [boolean]
      --debug    Run with verbose logging                               [string]
      --help     Show help                                             [boolean]
```

#### Build project

```sh
trc
```

#### Serve project in development server

```sh
trc --watch
```

### API

```ts
import { build } from '@fliegwerk/trc';

build(webpackConfig);
```

(cf. [docs](https://fliegwerk.github.io/trc) for a list of exported members)

## Author

👤 **fliegwerk**

- Website: https://www.fliegwerk.com
- Twitter: [@fliegwerk](https://twitter.com/fliegwerk)
- Github: [@fliegwerk](https://github.com/fliegwerk)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/fliegwerk/trc/issues).
You can also take a look at the [contributing guide](https://github.com/fliegwerk/trc/blob/main/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 Pablo Klaschka, Ludwig Richter.

This project is [MIT](https://github.com/fliegwerk/trc/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
