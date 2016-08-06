travi.org-admin
===============

[![Build Status](https://img.shields.io/circleci/project/travi/travi.org-admin.svg?style=flat)](https://circleci.com/gh/travi/travi.org-admin)
[![Coverage Status](http://img.shields.io/coveralls/travi/travi.org-admin.svg?style=flat)](https://coveralls.io/r/travi/travi.org-admin?branch=master)
[![Code Climate](http://img.shields.io/codeclimate/github/travi/travi.org-admin.svg?style=flat)](https://codeclimate.com/github/travi/travi.org-admin)
[![Dependency Status](http://img.shields.io/gemnasium/travi/travi.org-admin.svg?style=flat)](https://gemnasium.com/travi/travi.org-admin)

## Project Goals

As I continue to learn about the node and react ecosystems, my intent with this project is for it to be both a playground
for exploration as well as a reference implementation of the things that I have settled on as best practices. Some things
are likely out of date from what I consider to be the best practice, but is at least at one of the stages in my learning
process.

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
- [x] [React-router](https://github.com/rackt/react-router)
- [x] [Redux](http://rackt.org/redux/)
    * [Ducks](https://github.com/erikras/ducks-modular-redux)
- [x] [Redial](https://github.com/markdalgleish/redial)
- [x] [Immutable.js](https://facebook.github.io/immutable-js/)
- [x] [Webpack 2](https://webpack.github.io/)
- [ ] [React Hot Loader 3](https://github.com/gaearon/react-hot-loader)
- [x] [Hapi](https://hapijs.com)
- [x] [Traverson](https://github.com/basti1302/traverson) with the [HAL adapter](https://github.com/basti1302/traverson-hal)
- [ ] [Pact Consumer](https://github.com/pact-foundation/grunt-pact)
