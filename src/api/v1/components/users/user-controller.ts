'use strict';

import { Request, Response } from 'express';
// Servicios
import * as service from './user-service';
// Tipos
import Response_data from '../../types/Response_data';

export {
    login,
    signup,
    refresh_token,
    update
}

async function login(req: Request, res: Response) {

    const { email, password } = req.body;

    const user: Response_data = await service.login(email, password);
    return res.status(user.status).json(user);
}

async function signup(req: Request, res: Response) {

    const { data } = req.body;

    const user: Response_data = await service.signup(data);
    return res.status(user.status).json(user);
}

async function refresh_token(req: Request, res: Response) {

    const data = {
        refresh_token: req.body.refresh_token,
        grant_type: req.body.grant_type
    };

    const user: Response_data = await service.refresh_token(data);
    return res.status(user.status).json(user);
}

async function update(req: Request, res: Response) {

    const id = req.params.id;
    const data_body = req.body;

    const user: Response_data = await service.update(id, data_body);
    return res.status(user.status).json(user);
}