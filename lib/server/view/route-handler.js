import {listResourceTypes} from '../resources/controller';

export default function (request, reply) {
    return listResourceTypes().then((types) => reply({primaryNav: types}));
}
