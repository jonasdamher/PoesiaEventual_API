'use strict';

import { Request, Response } from 'express';
import AuthService from './auth-service';

class AuthController extends AuthService {

    public async login(req: Request, res: Response) {
        try {

            const { email, password } = req.body;

            const result = await super.userLogin(email, password);

            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async create(req: Request, res: Response) {
        try {

            const data_body = req.body;

            const result = await super.userCreate(data_body);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async confirmAccount(req: Request, res: Response) {
        try {

            const { token } = req.params;

            const result = await super.confirmAccountWithToken(token);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

}

export default new AuthController();