import {add as add} from '@travi/ioc';
import * as fetcher from './resources/fetcher';

export function define() {
    add('fetcher', fetcher);
}
