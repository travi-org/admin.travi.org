import helmet from 'react-helmet';
import {getAssets} from './asset-manager';
import Boom from 'boom';

export function respond(reply, {renderedContent, store, boomDetails}) {
    getAssets((error, resources) => {
        if (error) {
            reply(Boom.wrap(error));
        } else {
            const viewData = {
                    renderedContent,
                    resources,
                    title: helmet.rewind().title.toString(),
                    initialState: JSON.stringify(store.getState()),
                    boom: boomDetails ? JSON.stringify(boomDetails) : undefined
                },

                response = reply.view('layout', viewData);

            if (boomDetails) {
                response.code(boomDetails.statusCode);
            }
        }
    });
}
