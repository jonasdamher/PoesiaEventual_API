'use strict';

import { Request, Response } from 'express';
import UsersService from './users-service';
 
class UsersController extends UsersService {

    public async get_by_id(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const result = await super.get_user_by_id(id);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async login(req: Request, res: Response) {
        try {

            const { email, password } = req.body;
            console.log('login')
            const result = await super.user_login(email, password);
            console.log('login')

            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async create(req: Request, res: Response) {
        try {

            const data_body = req.body;

            const result = await super.user_create(data_body);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async confirm_account(req: Request, res: Response) {
        try {

            const { token } = req.params;

            const result = await super.confirm_account_by_token(token);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {

            const id = req.params.id;
            const data_body = req.body;

            const result = await super.update_user_by_id(id, data_body);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }
}

export default new UsersController();