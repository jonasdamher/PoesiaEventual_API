'use strict';

import { Request, Response } from 'express';
import * as service from './countries-service';
// Tipos
import Response_data from '../../types/Response_data';

export {
    getAll,
    getWithId,
    create
}

async function getAll(req: Request, res: Response) {

    const { page, perpage } = req.query;

    let current_page = Number(page ?? 1);
    let current_perpage = Number(perpage ?? 10);

    service.getAll(current_page, current_perpage)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}

async function getWithId(req: Request, res: Response) {

    const id = req.params.id;

    service.getWithId(id)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}

async function create(req: Request, res: Response) {

    const data_body = req.body;

    service.create(data_body)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}
