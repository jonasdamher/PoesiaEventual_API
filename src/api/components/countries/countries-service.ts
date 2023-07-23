'use strict';

import COUNTRY, { Country } from './countries-model';
// Ayudantes
import response_data from '../../utils/response_data';
import { logger_countries } from '../../helpers/logger';
// Tipos
import Response_data from '../../types/Response_data';
import { get_pagination, paginate } from '../../utils/pagination';
import Pagination from '../../types/Pagination';

export default class CountriesService {

    protected getAllCountries(page: number, perPage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            get_pagination(COUNTRY, page, perPage).then((pagination: Pagination) => {

                COUNTRY.find()
                    .skip(pagination.page_range)
                    .limit(pagination.perPage)
                    .sort('name')
                    .then((result: Country[] | null) => {

                        const data = {
                            countries: result,
                            pagination: paginate(pagination)
                        };

                        response.result = data;
                        resolve(response);

                    }).catch((err: any) => {

                        response.status = 400;
                        response.result = err;
                        reject(response);
                    });

            }).catch((err: any) => {

                response.status = 400;
                response.message = 'BadRequest';
                response.result = err;
                reject(response);
            });

        });
    }

    protected getByIdCountry(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            COUNTRY.findById(id).then((result: Country | null) => {

                response.result = result;
                resolve(response);
            }).catch((err: any) => {
                response.status = 400;
                response.result = err;
                reject(response);
            });
        });
    }

    protected createCountry(data: Partial<Country>): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            const country: Country = new COUNTRY(data);

            country.save().then((new_country: Country) => {

                response.status = 201;

                response.result = new_country;
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.result = err;
                logger_countries.info(err, 'service');
                reject(response);
            });
        });
    }

    protected update_country(id: string, data: Partial<Country>): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            COUNTRY.findByIdAndUpdate(id, { $set: data }, { new: true }).then((update_country: Country | null) => {

                response.result = update_country;
                resolve(response);

            }).catch((err: any) => {

                response.status = 400;
                response.result = err;
                logger_countries.info(err, 'service');
                reject(response);
            });
        });
    }

    protected delete_by_id_document(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            COUNTRY.findByIdAndDelete(id).then((result: Country | null) => {
                response.result = result;
                resolve(response);

            }).catch((err: any) => {

                response.status = 404;
                response.message = 'Not found';
                response.result = err;

                reject(response);
            });
        });
    }

}
