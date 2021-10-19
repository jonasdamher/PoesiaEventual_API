'use strict';

import { Request, Response } from 'express';
import AuthorsService from './author-service';
import { currentPage, currentPerPage } from '../../utils/pagination';

class AuthorController extends AuthorsService {

    async get_all(req: Request, res: Response) {
        try {

            const { page, perpage } = req.query;

            let current_page = currentPage(page);
            let current_perpage = currentPerPage(perpage);

            const result = await this.get_all_authors(current_page, current_perpage);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async get_by_id(req: Request, res: Response) {
        try {

            const id = req.params.id;

            const result = await this.get_author_by_id(id);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async get_by_name(req: Request, res: Response) {
        try {

            const name = req.params.name;

            const result = await this.get_author_by_name(name);
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

            const result = await this.search_author(current_page, current_perpage, search);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async random(req: Request, res: Response) {
        try {

            const result = await this.random_author();
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async create(req: Request, res: Response) {
        try {

            const data_body = req.body;

            const result = await this.create_author(data_body);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data_body = req.body;

            const result = await this.update_author(id, data_body);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }
}

export default new AuthorController();