'use strict';

import { Request, Response } from 'express';
import PoemsService from './poems-service';
import { currentPage, currentPerPage } from '../../utils/pagination';

class PoemsController extends PoemsService {

    public async get_all(req: Request, res: Response) {
        try {
            const { page, perPage } = req.query;

            const current_page = currentPage(page);
            const current_perPage = currentPerPage(perPage);
            
            const result = await super.get_all_poems(current_page, current_perPage);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);

        }
    }

    public async get_by_id(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const result = await super.get_poem_by_id_(id);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async search(req: Request, res: Response) {
        try {
            const { page, perPage } = req.query;
            const search = req.params.search.trim().toLowerCase();

            const current_page = Number(page ?? 1);
            const current_perPage = Number(perPage ?? 10);

            const result = await super.search_poem(current_page, current_perPage, search);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);

        }
    }

    public async random(req: Request, res: Response) {
        try {

            const result = await super.random_poem();
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async get_all_poems_of_author(req: Request, res: Response) {
        try {
            const { page, perPage } = req.query;
            const id = req.params.id;

            const current_page = Number(page ?? 1);
            const current_perPage = Number(perPage ?? 10);

            const result = await super.get_all_poems_of_author_by_id(current_page, current_perPage, id);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const data_body = req.body;

            const result = await super.create_poem(data_body);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data_body = req.body;

            const result = await super.update_poem(id, data_body);
            return res.status(result.status).json(result);

        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

}

export default new PoemsController();