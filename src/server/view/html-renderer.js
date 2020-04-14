import {Helmet} from 'react-helmet';
import serialize from 'serialize-javascript';
import getAssets from './asset-manager';

export default async function (h, {renderedContent, store, status, boomDetails}) {
  const resources = await getAssets();

  return h.view('layout', {
    renderedContent,
    resources,
    title: Helmet.rewind().title.toString(),
    initialState: serialize(store.getState(), {isJSON: true}),
    boom: boomDetails ? serialize(boomDetails, {isJSON: true}) : undefined
  }).code(boomDetails ? boomDetails.statusCode : status);
}
