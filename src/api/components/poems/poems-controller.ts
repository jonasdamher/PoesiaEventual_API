'use strict';

import { Request, Response } from 'express';
import PoemsService from './poems-service';

class PoemsController extends PoemsService {

    async get_all(req: Request, res: Response) {
        try {
            const { page, perpage } = req.query;

            let current_page = Number(page ?? 1);
            let current_perpage = Number(perpage ?? 10);

            const result = await super.get_all_poems(current_page, current_perpage)
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);

        }
    }

    async get_by_id(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const result = await super.get_poem_by_id_(id)
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async search(req: Request, res: Response) {
        try {
            const { page, perpage } = req.query;
            const search = req.params.search.trim().toLowerCase();

            let current_page = Number(page ?? 1);
            let current_perpage = Number(perpage ?? 10);

            const result = await super.search_poem(current_page, current_perpage, search);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);

        }
    }

    async random(req: Request, res: Response) {
        try {

            const result = await super.random_poem();
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async get_all_poems_of_author(req: Request, res: Response) {
        try {
            const { page, perpage } = req.query;
            const id = req.params.id;

            let current_page = Number(page ?? 1);
            let current_perpage = Number(perpage ?? 10);

            const result = await super.get_all_poems_of_author_by_id(current_page, current_perpage, id)
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data_body = req.body;

            const result = await super.create_poem(data_body);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }
}

export default new PoemsController();