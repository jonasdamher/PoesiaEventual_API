'use strict';

import { Request, Response } from 'express';
import * as service from './books-service';
// Tipos
import Response_data from '../../types/Response_data';

export {
    get_all,
    get_by_id,
    search,
    create
}

async function get_all(req: Request, res: Response) {

    const { page, perpage } = req.query;

    let current_page = Number(page ?? 1);
    let current_perpage = Number(perpage ?? 10);

    service.get_all(current_page, current_perpage)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}

async function get_by_id(req: Request, res: Response) {

    const id = req.params.id;

    service.get_by_id(id)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}

async function search(req: Request, res: Response) {

    const { page, perpage } = req.query;
    const search = req.params.search.trim().toLowerCase();

    let current_page = Number(page ?? 1);
    let current_perpage = Number(perpage ?? 10);

    service.search(current_page, current_perpage, search)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}

async function create(req: Request, res: Response) {

    const data_body = req.body;

    service.create(data_body)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}
