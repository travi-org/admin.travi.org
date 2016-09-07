import React from 'react';
import Wrap from '../theme/wrap/component';
import {ServerError, NotFound} from '@travi/admin.travi.org-components';

const NOT_FOUND = 404;

function error(code) {      //eslint-disable-line react/display-name
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

ErrorPage.displayName = 'ErrorPage';
