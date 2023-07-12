'use strict';

import { Request, Response } from 'express';
import CountriesService from './countries-service';
import { currentPage, currentPerPage } from '../../utils/pagination';

class CountriesController extends CountriesService {
    public async getAll(req: Request, res: Response) {
        try {
            const { page, perPage } = req.query;

            const current_page = currentPage(page);
            const current_perPage = currentPerPage(perPage);

            const result = await super.getAllCountries(current_page, current_perPage);

            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async getWithId(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const result = await super.getByIdCountry(id);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const data_body = req.body;

            const result = await super.createCountry(data_body);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {

            const id = req.params.id;
            const data_body = req.body;

            const result = await super.update_country(id, data_body);
            return res.status(result.status).json(result);
        } catch (error: any) {
            return res.status(error.status).json(error);
        }
    }

}
export default new CountriesController();