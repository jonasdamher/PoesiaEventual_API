'use strict';

import csrf from 'csurf';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

export default (config.app.node_env === 'test'
    ?
    function (req: Request, res: Response, next: NextFunction) {
        next();
    } :
    csrf({ cookie: true }));

