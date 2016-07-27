import {use} from '../ioc/container';

export default ({dispatch}) => (next) => (action) => {
    const
        fetcher = use('fetcher'),
        {fetch, initiate, success, failure} = action;

    if (!fetch) {
        return next(action);
    }

    dispatch({type: initiate});

    return fetch(fetcher).then(
        (response) => dispatch({type: success, resource: response}),
        (err) => dispatch({type: failure, error: err})
    );
};
