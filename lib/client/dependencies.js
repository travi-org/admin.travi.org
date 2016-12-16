import {register} from '@travi/ioc';
import * as fetcher from './fetcher';

export function configure() {
    register('fetcher-factory', fetcher);
}
