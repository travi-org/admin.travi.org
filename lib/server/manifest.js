import {getRoutes} from '../shared/routes';
import {respond} from './view/html-renderer';
import Root from '../shared/views/root/root';
import {configureStore} from '../shared/store/create';

const
    defaultPort = 3333,
    port = process.env.PORT || defaultPort;

export default {
    'connections': [{port}],
    'registrations': [
        {plugin: 'inert'},
        {plugin: 'vision'},
        {plugin: 'h2o2'},
        {
            plugin: {
                register: 'visionary',
                options: {
                    'engines': {'mustache': 'hapi-mustache'},
                    'path': './lib/server/view'
                }
            }
        },
        {
            plugin: {
                register: 'good',
                options: {
                    ops: {
                        interval: 1000
                    },
                    'reporters': {
                        console: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ log: '*', request: '*', response: '*', error: '*' }]
                            },
                            {module: 'good-console'},
                            'stdout'
                        ]
                    }
                }
            }
        },
        {plugin: '@travi/hapi-html-request-router'},
        {
            plugin: {
                register: '@travi/hapi-react-router',
                options: {routes: getRoutes(), respond, Root, configureStore}
            }
        },
        {plugin: './core/landing'},
        {plugin: './view/static-assets'},
        {plugin: './resources/routes'},
        {plugin: './view/error-renderer'}
    ]
};
