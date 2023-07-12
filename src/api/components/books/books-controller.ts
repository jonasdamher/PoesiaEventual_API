'use strict';

import { Request, Response } from 'express';
import BooksService from './books-service';
import { currentPage, currentPerPage } from '../../utils/pagination';

class BooksController extends BooksService {

    public async get_all(req: Request, res: Response) {
        try {
            const { page, perPage } = req.query;

            const current_page = currentPage(page);
            const current_perPage = currentPerPage(perPage);

            const result = await super.get_all_books(current_page, current_perPage);
            res.status(result.status).json(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    public async get_by_id(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const result = await super.get_book_by_id(id);
            res.status(result.status).json(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    public async search(req: Request, res: Response) {
        try {
            const { page, perPage } = req.query;
            const search = req.params.search.trim().toLowerCase();

            const current_page = Number(page ?? 1);
            const current_perPage = Number(perPage ?? 10);

            const result = await super.search_book(current_page, current_perPage, search);
            res.status(result.status).json(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const data_body = req.body;

            const result = await super.create_book(data_body);
            res.status(result.status).json(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data_body = req.body;

            const result = await super.update_book(id, data_body);
            res.status(result.status).json(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

}

export default new BooksController();