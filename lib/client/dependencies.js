import {add} from '../shared/ioc/container';
import * as fetcher from './fetcher';

export function configure() {
    add('fetcher', fetcher);
}
