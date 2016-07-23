import {Map} from 'immutable';

let dependencies = Map();

export function add(name, dependency) {
    dependencies = dependencies.set(name, dependency);
}

export function use(name) {
    return dependencies.get(name);
}
