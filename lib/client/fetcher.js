import {get} from 'xhr';

export function getResource({type, id}) {
    return get(`/${type}/${id}`);
}
