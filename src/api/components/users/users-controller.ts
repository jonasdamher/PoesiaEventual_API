'use strict';

import { Request, Response } from 'express';
import UsersService from './users-service';

class UsersController extends UsersService {

    public async getById(req: any, res: Response) {
        try {
            const id = req.user._id;

            const result = await super.getUserById(id);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {

            const id = req.params.id;
            const data_body = req.body;

            const result = await super.updateUserById(id, data_body);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }
}

export default new UsersController();