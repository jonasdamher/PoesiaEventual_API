'use strict';

// Modelos
import OCCUPATION, { Occupation } from './occupations-model';
// Ayudantes
import ResponseHandler from '../../helpers/ResponseHandler';
// Tipos
import Response_data from '../../types/Response_data';

export default class OccupationService extends ResponseHandler {

    get_all_occupations(): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            OCCUPATION.find().sort('name').then((res: any) => {

                this.result(res);
                resolve(this.response());
            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            });
        });
    }

    get_occupation_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            OCCUPATION.findById(id).then((res: any) => {

                this.result(res);
                resolve(this.response());
            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            })
        });
    }

    create_occupation(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const new_occupation: Occupation = new OCCUPATION(data);

            new_occupation.save().then((occupation_created: Occupation) => {

                this.status(201).message('Created').result(occupation_created);
                resolve(this.response());
            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            })
        });
    }
}