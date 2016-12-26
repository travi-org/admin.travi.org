import {register} from '@travi/ioc';
import * as fetcherFactory from './resources/fetcher';

export function define() {
  register('fetcher-factory', fetcherFactory);
}
