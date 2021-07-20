'use strict';

import { Request, Response } from 'express';
import EditorialsService from './editorials-service';
// Tipos
import Response_data from '../../types/Response_data';

class EditorialsController extends EditorialsService {

    async get_all(req: Request, res: Response) {
        try {
            const result = await this.get_all_editorials();
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async get_with_id(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const result = await this.get_editorial_by_id(id);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data_body = req.body;

            const result = await this.create_editorial(data_body);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }
}
export default new EditorialsController();