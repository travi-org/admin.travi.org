import helmet from 'react-helmet';
import Boom from 'boom';
import serialize from 'serialize-javascript';
import getAssets from './asset-manager';

export default function (reply, {renderedContent, store, status, boomDetails}) {
  return getAssets().then(resources => {
    const response = reply.view('layout', {
      renderedContent,
      resources,
      title: helmet.rewind().title.toString(),
      initialState: serialize(store.getState(), {isJSON: true}),
      boom: boomDetails ? serialize(boomDetails, {isJSON: true}) : undefined
    }).code(status);

    if (boomDetails) {
      response.code(boomDetails.statusCode);
    }
  }).catch(error => reply(Boom.wrap(error)));
}
