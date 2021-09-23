'use strict';

// Modelos
import GENRE, { Genre } from './genres-model';
// Ayudantes
import ResponseHandler from '../../helpers/ResponseHandler';
// Tipos
import Response_data from '../../types/Response_data';

export default class GenresService extends ResponseHandler {

    get_all_genres(): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            GENRE.find().sort('name').then((res: any) => {

                this.result(res);
                resolve(this.response());
            }).catch((err: any) => {

                this.status(404).message('Dont found').result(err);
                reject(this.response());
            });
        });
    }

    get_genre_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            GENRE.findById(id).then((res: any) => {

                this.result(res);
                resolve(this.response());
            }).catch((err: any) => {

                this.status(404).message('Dont found').result(err);
                reject(this.response());
            })
        });
    }

    create_genre(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const new_genre: Genre = new GENRE(data);

            new_genre.save().then((res: Genre) => {

                this.status(201).message('Created').result(res);
                resolve(this.response());
            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            })
        });
    }
}