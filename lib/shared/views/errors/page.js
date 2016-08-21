import React from 'react';
import createWrap from '../theme/wrap/component';
import {createServerError} from '@travi/admin.travi.org-components';

const
    Wrap = createWrap(React),
    ServerError = createServerError(React);

export default function ErrorPage() {
    return <Wrap><ServerError/></Wrap>;
}
