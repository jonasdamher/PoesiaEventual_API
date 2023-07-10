'use strict';

import { Request, Response } from 'express';
import EditorialsService from './editorials-service';

class EditorialsController extends EditorialsService {

    public async get_all(req: Request, res: Response) {
        try {
            const result = await super.get_all_editorials();
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async get_with_id(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const result = await super.get_editorial_by_id(id);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const data_body = req.body;

            const result = await super.create_editorial(data_body);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data_body = req.body;

            const result = await super.update_editorial(id, data_body);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

}
export default new EditorialsController();