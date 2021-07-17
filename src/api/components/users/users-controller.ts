'use strict';

import { Request, Response } from 'express';
import * as service from './users-service';
// Tipos
import Response_data from '../../types/Response_data';

export {
    get_by_id,
    login,
    create,
    confirm_account,
    update
}

async function get_by_id(req: Request, res: Response) {

    const id = req.params.id;

    service.get_by_id(id)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}

async function login(req: Request, res: Response) {

    const { email, password } = req.body;

    service.login(email, password)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}

async function create(req: Request, res: Response) {

    const data_body = req.body;

    service.create(data_body)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}

async function confirm_account(req: Request, res: Response) {

    const { token } = req.params;

    service.confirm_account(token)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}

async function update(req: Request, res: Response) {

    const id = req.params.id;
    const data_body = req.body;

    service.update(id, data_body)
        .then((ok: Response_data) => res.status(ok.status).json(ok))
        .catch((err: Response_data) => res.status(err.status).json(err))
}