const dependencies = {};

export function add(name, dependency) {
    dependencies[name] = dependency;
}

export function use(name) {
    return dependencies[name];
}
