import {add} from '@travi/ioc';
import * as fetcher from './fetcher';

export function configure() {
    add('fetcher', fetcher);
}
