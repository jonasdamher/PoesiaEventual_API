'use strict';

import { Request, Response } from 'express';
import AuthorsService from './author-service';
import { currentPage, currentPerPage } from '../../utils/pagination';
import { Schema } from 'mongoose';

class AuthorController extends AuthorsService {

    public async get_all(req: Request, res: Response) {
        try {

            const { page, perPage } = req.query;

            const current_page: number = currentPage(page);
            const current_perPage: number = currentPerPage(perPage);

            const result = await super.get_all_authors(current_page, current_perPage);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async get_by_id(req: Request, res: Response) {
        try {

            const id: string = req.params.id;

            const result = await super.get_author_by_id(id);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async get_by_url(req: Request, res: Response) {
        try {

            const url: string = req.params.url;

            const result = await super.get_author_by_url(url);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async search(req: Request, res: Response) {
        try {

            const { page, perPage } = req.query;

            const search: string = req.params.search.trim().toLowerCase();

            const current_page: number = currentPage(page);
            const current_perPage: number = currentPerPage(perPage);

            const result = await super.search_author(current_page, current_perPage, search);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async random(req: Request, res: Response) {
        try {

            const result = await super.random_author();
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async create(req: Request, res: Response) {
        try {

            const data_body = req.body;

            const result = await super.create_author(data_body);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const data_body = req.body;

            const result = await super.update_author(id, data_body);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async delete_by_id(req: Request, res: Response) {
        try {
            const id: string = req.params.id;

            const result = await super.delete_by_id_document(id);
            return res.status(result.status).json(result);

        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

}

export default new AuthorController();