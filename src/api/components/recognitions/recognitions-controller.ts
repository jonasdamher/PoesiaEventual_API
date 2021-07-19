'use strict';

import { Request, Response } from 'express';
import RecogService from './recognitions-service';
// Tipos
import Response_data from '../../types/Response_data';

class RecogController extends RecogService {

    async get_all(req: Request, res: Response) {

        const { page, perpage } = req.query;

        let current_page = Number(page ?? 1);
        let current_perpage = Number(perpage ?? 10);

        this.get_all_recog(current_page, current_perpage)
            .then((ok: Response_data) => res.status(ok.status).json(ok))
            .catch((err: Response_data) => res.status(err.status).json(err))
    }

    async get_by_id(req: Request, res: Response) {

        const id = req.params.id;

        this.get_recog_by_id(id)
            .then((ok: Response_data) => res.status(ok.status).json(ok))
            .catch((err: Response_data) => res.status(err.status).json(err))
    }

    async search(req: Request, res: Response) {

        const { page, perpage } = req.query;
        const search = req.params.search.trim().toLowerCase();

        let current_page = Number(page ?? 1);
        let current_perpage = Number(perpage ?? 10);

        this.search_recogs(current_page, current_perpage, search)
            .then((ok: Response_data) => res.status(ok.status).json(ok))
            .catch((err: Response_data) => res.status(err.status).json(err))
    }

    async create(req: Request, res: Response) {
        try {
            const data_body = req.body;

            const result = await this.create_recog(data_body)
            res.status(result.status).json(result);

        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }
}

export default new RecogController();