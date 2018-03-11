import {Before, After} from 'cucumber';
import loadApi from '../../../../src/server/app';

Before(async function () {
  this.server = await loadApi;
});

After(async function () {
  await this.server.stop();
});
