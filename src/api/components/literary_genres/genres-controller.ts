'use strict';

import { Request, Response } from 'express';
import GenresService from './genres-service';

class GenresController extends GenresService {

    public async get_all(req: Request, res: Response) {
        try {
            const result = await super.get_all_genres();
            return res.status(result.status).json(result);

        } catch (err: any) {
            return res.status(err.status).json(err);
        }
    }

    public async get_with_id(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const result = await super.get_genre_by_id(id);
            return res.status(result.status).json(result);
        } catch (err: any) {
            return res.status(err.status).json(err);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const data_body = req.body;

            const result = await super.create_genre(data_body);
            return res.status(result.status).json(result);
        } catch (err: any) {
            return res.status(err.status).json(err);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data_body = req.body;

            const result = await super.update_genre(id, data_body);
            return res.status(result.status).json(result);
        } catch (err: any) {
            return res.status(err.status).json(err);
        }
    }

    public async delete_by_id(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const result = await super.delete_by_id_document(id);
            return res.status(result.status).json(result);

        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

}
export default new GenresController();