'use strict';

import COUNTRY, { Country } from './countries-model';
// Ayudantes
import response_data from '../../utils/response_data';
import { logger_countries } from '../../helpers/logger';
// Tipos
import Response_data from '../../types/Response_data';

export default class CountriesService {
    protected getAllCountries(page: number, perPage: number): Promise<Response_data> {
        return new Promise((resolve, reject) => {
            const response = response_data();

            let current_page = Math.max(0, page);
            const pageNum = current_page;
            --current_page;

            COUNTRY.find().countDocuments().then((count: any) => {

                const limit = Math.ceil(count / perPage);

                COUNTRY.find({ language: 'es' })
                    .skip(perPage * current_page)
                    .limit(perPage)
                    .sort('name')
                    .then((authorResponse: any) => {

                        const data = {
                            countries: authorResponse,
                            pagination: {
                                perPage: perPage,
                                page: pageNum,
                                lastPage: limit,
                                total: count
                            }
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
                response.result = err;
                reject(response);
            });
        });
    }

    protected getByIdCountry(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            COUNTRY.findById({ _id: id }).then((poem: any) => {

                response.result = poem;
                resolve(response);
            }).catch((err: any) => {
                response.status = 400;
                response.result = err;
                reject(response);
            });
        });
    }

    protected createCountry(data: any): Promise<Response_data> {
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

    protected update_country(id: any, data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const response = response_data();

            COUNTRY.findByIdAndUpdate(id, { $set: data }, { new: true }).then((update_country: any) => {

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

}
