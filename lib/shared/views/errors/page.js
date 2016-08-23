import React from 'react';
import createWrap from '../theme/wrap/component';
import {createServerError, createNotFound} from '@travi/admin.travi.org-components';

const
    Wrap = createWrap(React),
    NotFound = createNotFound(React),
    ServerError = createServerError(React),

    NOT_FOUND = 404;

function error(code) {
    switch (code) {
    case NOT_FOUND:
        return <NotFound/>;
    default:
        return <ServerError/>;
    }
}

export default function ErrorPage({statusCode}) {
    return <Wrap>{error(statusCode)}</Wrap>;
}
