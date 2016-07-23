import {define as add} from '../shared/ioc/container';
import * as fetcher from './fetcher';

export function define() {
    add('fetcher', fetcher);
}
