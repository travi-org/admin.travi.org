# travi.org-admin

<!--status-badges start -->

[![Build Status](https://img.shields.io/travis/com/travi-org/admin.travi.org/master.svg?style=flat)](https://travis-ci.com/travi-org/admin.travi.org)
[![Codecov](https://img.shields.io/codecov/c/github/travi-org/admin.travi.org.svg)](https://codecov.io/github/travi-org/admin.travi.org)
[![Code Climate](http://img.shields.io/codeclimate/github/travi-org/admin.travi.org.svg?style=flat)](https://codeclimate.com/github/travi-org/admin.travi.org)
[![travi.org-admin/travi-api Pact Status](https://pact-api.travi.org/pacts/provider/travi-api/consumer/travi.org-admin/latest/badge.svg?style=flat)](https://pact-api.travi.org)

<!--status-badges start -->

<!--consuner-badges start -->

[![license](https://img.shields.io/github/license/travi/travi.org-admin.svg)](LICENSE)

<!--consumer-badges end -->

## Project Goals

As I continue to learn about the node and react ecosystems, my intent with this
project is for it to be both a playground for exploration as well as a reference
implementation of the things that I have settled on as best practices.

Since this is a side-project, some areas may be behind my progression of preferring
a certain approach. Some things may also seem to go a bit far for such a small
project, but please keep in mind that this is intended to be a reference implementation.

### Core Concepts

- [x] ES6
- [x] Universal Rendering
- [x] Progressive Enhancement
- [x] Package management of React components to share components with npm
- [ ] Intelligent management of client-side dependencies
  - [ ] Cut the Mustard
  - [ ] Progressive Enhancement based on browser capabilities
  - [ ] Lazy Loading
- [ ] Performance
- [ ] Delegated Authentication (likely [Auth0](https://auth0.com/))
- [x] Thin [Hal](http://stateless.co/hal_specification.html) Hypermedia client
- [ ] OAuth/[Oz](https://github.com/hueniverse/oz) client
- [ ] API driven form construction
- [ ] API driven form validation

### Key Technology

- [x] [React](https://facebook.github.io/react/)
- [x] [React-router v3](https://github.com/rackt/react-router)
- [x] [Redux](http://rackt.org/redux/)
  - [Ducks](https://github.com/erikras/ducks-modular-redux)
- [x] [Redial](https://github.com/markdalgleish/redial)
- [x] [Immutable.js](https://facebook.github.io/immutable-js/)
- [x] [Webpack 2](https://webpack.github.io/)
  - [x] Tree-shaking
  - [x] Vendor Chunk
  - [ ] Code Splitting
  - [x] Commons Chunk
  - [x] Cache busting when assets change
- [x] [React Hot Loader 3](https://github.com/gaearon/react-hot-loader)
- [x] [Hapi](https://hapijs.com)
- [x] [Traverson](https://github.com/basti1302/traverson) with the [HAL adapter](https://github.com/basti1302/traverson-hal)
- [ ] [Pact Consumer](https://github.com/pact-foundation/grunt-pact)
  - [x] publish pacts to [my broker](https://pact-api.travi.org)
  - [x] ensure pacts have passed provider verification before deploying
  - [ ] enable promotion of pacts from wip to production

## Contribution

<!--contribution-badges start -->

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Greenkeeper badge](https://badges.greenkeeper.io/travi-org/admin.travi.org.svg)](https://greenkeeper.io/)

<!--contribution-badges end -->

### Install Dependencies

```bash
$ nvm install
$ npm install
```

### Run in development mode

Against the production API

```bash
$ npm run dev
```

Against a local API

```bash
$ npm run dev-local
```

### Verification

```bash
$ npm test
```

### Analyze the Webpack bundle

After `npm run build` has been run, load `resources/js/stats.html` in a browser
