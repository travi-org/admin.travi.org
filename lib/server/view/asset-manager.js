import assets from '../../../webpack-assets.json';

export function getAssets(callback) {
    callback(null, assets);
}
