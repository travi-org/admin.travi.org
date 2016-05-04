travi.org-admin
===============

[![Build Status](https://img.shields.io/circleci/project/travi/travi.org-admin.svg?style=flat)](https://circleci.com/gh/travi/travi.org-admin)
[![Coverage Status](http://img.shields.io/coveralls/travi/travi.org-admin.svg?style=flat)](https://coveralls.io/r/travi/travi.org-admin?branch=master)
[![Code Climate](http://img.shields.io/codeclimate/github/travi/travi.org-admin.svg?style=flat)](https://codeclimate.com/github/travi/travi.org-admin)
[![Dependency Status](http://img.shields.io/gemnasium/travi/travi.org-admin.svg?style=flat)](https://gemnasium.com/travi/travi.org-admin)

## Project Goals

I'm using this as an opportunity to learn how to apply a number of core concepts of web development to node. I want to find
an acceptable way to piece together `hapi` and `react` to support the following:

### Core Concepts

- [x] Universal Rendering
- [x] Progressive Enhancement
- [ ] Intelligent management of client-side dependencies
    - [ ] Cut the Mustard
    - [ ] Progressive Enhancement based on browser capabilities
    - [ ] Lazy Loading
- [ ] Performance
- [ ] OpenID Authentication
- [x] Thin Hal Hypermedia client
- [ ] OAuth/Oz client
- [ ] API driven form validation
 
### Key Technology
- [x] [Hapi](https://hapijs.com)
- [x] [Traverson](https://github.com/basti1302/traverson) with the [HAL adapter](https://github.com/basti1302/traverson-hal)
- [x] [React](https://facebook.github.io/react/)
- [x] [React-router](https://github.com/rackt/react-router)
- [x] [Redux](http://rackt.org/redux/)
- [x] [React Storybook](https://github.com/kadirahq/react-storybook) ([View the demo](https://travi.github.io/travi.org-admin) site of the components)
- [ ] [Webpack](https://webpack.github.io/)
- [ ] [Pact Consumer](https://github.com/pact-foundation/grunt-pact)
