'use strict';

import { Request, Response } from 'express';
import CountriesService from './countries-service';
// Tipos
import Response_data from '../../types/Response_data';

class CountriesController extends CountriesService {
    async getAll(req: Request, res: Response) {
        try {
            const { page, perpage } = req.query;

            let current_page = Number(page ?? 1);
            let current_perpage = Number(perpage ?? 10);

            const result = await super.getAllCountries(current_page, current_perpage);

            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async getWithId(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const result = await super.getByIdCountry(id);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data_body = req.body;

            const result = await super.createCountry(data_body);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }
}
export default new CountriesController();