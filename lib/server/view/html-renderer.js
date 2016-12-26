import helmet from 'react-helmet';
import Boom from 'boom';
import serialize from 'serialize-javascript';
import getAssets from './asset-manager';

export default function (reply, {renderedContent, store, status, boomDetails}) {
  getAssets((error, resources) => {
    if (error) {
      reply(Boom.wrap(error));
    } else {
      const viewData = {
        renderedContent,
        resources,
        title: helmet.rewind().title.toString(),
        initialState: serialize(store.getState(), {isJSON: true}),
        boom: boomDetails ? serialize(boomDetails, {isJSON: true}) : undefined
      };

      const response = reply.view('layout', viewData).code(status);

      if (boomDetails) {
        response.code(boomDetails.statusCode);
      }
    }
  });
}
