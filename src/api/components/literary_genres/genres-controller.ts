'use strict';

import { Request, Response } from 'express';
import GenresService from './genres-service';
// Tipos
import Response_data from '../../types/Response_data';

class GenresController extends GenresService {

    public async get_all(req: Request, res: Response) {
        try {
            const result = await this.get_all_genres();
            return res.status(result.status).json(result);

        } catch (err: any) {
            return res.status(err.status).json(err);
        }
    }

    public async get_with_id(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const result = await this.get_genre_by_id(id);
            return res.status(result.status).json(result);
        } catch (err: any) {
            return res.status(err.status).json(err);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const data_body = req.body;

            const result = await this.create_genre(data_body);
            return res.status(result.status).json(result);
        } catch (err: any) {
            return res.status(err.status).json(err);
        }
    }
}
export default new GenresController();