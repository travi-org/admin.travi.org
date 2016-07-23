import {Map} from 'immutable';

let dependencies = Map();

export function define(name, dependency) {
    dependencies = dependencies.set(name, dependency);
}

export function use(name) {
    return dependencies.get(name);
}
