import {register} from '@travi/ioc';
import * as fetcher from './fetcher';

export default function () {
  register('fetcher-factory', fetcher);
}
