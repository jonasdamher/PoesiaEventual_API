'use strict';

// Modelos
import EDITOR, { Editorial } from './editorials-model';
// Ayudantes
import ResponseHandler from '../../helpers/ResponseHandler';
// Tipos
import Response_data from '../../types/Response_data';

export default class EditorialsService extends ResponseHandler {

    get_all_editorials(): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            EDITOR.find().sort('name').then((res: any) => {

                this.result(res);
                resolve(this.response());
            }).catch((err: any) => {
                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            });
        });
    }

    get_editorial_by_id(id: string): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            EDITOR.findById(id).then((res: any) => {

                this.result(res);
                resolve(this.response());
            }).catch((err: any) => {
                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            })
        });
    }

    create_editorial(data: any): Promise<Response_data> {
        return new Promise((resolve, reject) => {

            const new_genre: Editorial = new EDITOR(data);

            new_genre.save().then((res: Editorial) => {

                this.status(201).message('Created').result(res);
                resolve(this.response());
            }).catch((err: any) => {

                this.status(400).message('BadRequest').result(err);
                reject(this.response());
            })
        });
    }
}