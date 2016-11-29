import helmet from 'react-helmet';
import {getAssets} from './asset-manager';
import Boom from 'boom';
import serialize from 'serialize-javascript';

export function respond(reply, {renderedContent, store, boomDetails}) {
    getAssets((error, resources) => {
        if (error) {
            reply(Boom.wrap(error));
        } else {
            const
                viewData = {
                    renderedContent,
                    resources,
                    title: helmet.rewind().title.toString(),
                    initialState: serialize(store.getState(), {isJSON: true}),
                    boom: boomDetails ? serialize(boomDetails, {isJSON: true}) : undefined
                },

                response = reply.view('layout', viewData);

            if (boomDetails) {
                response.code(boomDetails.statusCode);
            }
        }
    });
}
