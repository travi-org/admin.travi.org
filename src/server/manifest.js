import mustache from 'mustache';
import * as sentry from '@sentry/node';
import {getRoutes} from '../shared/routes';
import respond from './view/html-renderer';
import Root from '../shared/views/root/root';
import {configureStore} from '../shared/store/create';

sentry.init({dsn: process.env.SENTRY_DSN});

const defaultPort = 3333;
const port = process.env.PORT || defaultPort;
const isDevelopment = 'development' === process.env.NODE_ENV;
const isProduction = 'production' === process.env.NODE_ENV;

export default {
  server: {routes: {security: true}, port},
  register: {
    plugins: [
      {plugin: '@hapi/scooter'},
      {
        plugin: 'blankie',
        options: {
          reportUri: 'https://travi.report-uri.io/r/default/csp/enforce',
          defaultSrc: 'https:',
          styleSrc: [
            'self',
            'fonts.googleapis.com',
            isDevelopment ? 'blob:' : undefined
          ].filter(src => !!src),
          scriptSrc: [
            'self',
            'cdn.polyfill.io',
            'www.google-analytics.com',
            isDevelopment ? 'unsafe-eval' : undefined
          ].filter(src => !!src),
          fontSrc: [
            'data:',
            'fonts.gstatic.com'
          ],
          imgSrc: [
            'self',
            'www.gravatar.com',
            'www.google-analytics.com'
          ],
          connectSrc: isDevelopment ? [
            'ws://localhost:3000',
            'ws://0.0.0.0:3000',
            'http://localhost:3000',
            'http://0.0.0.0:3000',
            'http://localhost:3333',
            'http://0.0.0.0:3333'
          ] : undefined
        }
      },
      {plugin: '@hapi/inert'},
      {
        plugin: '@hapi/vision',
        options: {
          engines: {
            mustache: {
              compile: template => {
                mustache.parse(template);

                return context => mustache.render(template, context);
              }
            }
          },
          path: './src/server/view'
        }
      },
      {plugin: '@hapi/h2o2'},
      {
        plugin: '@hapi/good',
        options: {
          ops: false,
          reporters: {
            console: [
              {
                module: '@hapi/good-squeeze',
                name: 'Squeeze',
                args: [{log: '*', request: '*', response: '*', error: '*'}]
              },
              ...isProduction
                ? [
                  {
                    module: 'good-sentry',
                    args: [{
                      dsn: process.env.SENTRY_DSN,
                      captureUncaught: true
                    }]
                  }
                ]
                : [
                  {module: '@hapi/good-console'},
                  'stdout'
                ]
            ]
          }
        }
      },
      {plugin: '@travi/hapi-html-request-router'},
      {
        plugin: '@travi/hapi-react-router',
        options: {routes: getRoutes(), respond, Root, configureStore}
      },
      {plugin: './core/landing'},
      {plugin: './view/static-assets'},
      {plugin: './resources/routes'},
      {plugin: './view/error-renderer'}
    ]
  }
};
