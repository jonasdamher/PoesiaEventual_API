'use strict';

import { Request, Response } from 'express';
import * as service from './occupations-service';
// Tipos
import Response_data from '../../types/Response_data';

export {
    get_all,
    get_with_id,
    create
}

async function get_all(req: Request, res: Response) {

    service.get_all()
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}

async function get_with_id(req: Request, res: Response) {

    const id = req.params.id;

    service.get_with_id(id)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}

async function create(req: Request, res: Response) {

    const data_body = req.body;

    service.create(data_body)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}