'use strict';

import moment from 'moment';
import mongoose, { Model, model, Document, Schema } from 'mongoose';
import * as regex from '../../utils/regex';
import AUTHOR from '../authors/author-model';

export interface Occupation extends Document {
    name: string;
    description: string;
    createdAt: number;
    updatedAt: number;

    deleteOccupation(): Promise<any>;

}

const occupations_schema: Schema<Occupation> = new Schema({
    name: {
        type: String,
        validate: {
            validator: function (v: any) {
                return regex.text_only.test(v);
            },
            message: (props: any) => `(${props.value}) no tiene el formato adecuado.`
        },
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    createdAt: Number,
    updatedAt: Number
}, {
    timestamps: {
        currentTime: () => moment().unix()
    }
});

occupations_schema.methods.deleteOccupation = async function (this: Occupation) {

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const del: any = await OCUP.findByIdAndDelete(this._id)
        // borrar el registro asociado a los autores tambien
        await AUTHOR.updateMany({}, { $pull: { occupations: this._id } })

        await session.commitTransaction();

        return del;

    } catch (error: any) {
        await session.abortTransaction();
        return error;
    } finally {
        // Finaliza la sesión
        session.endSession();
    }
};

const OCUP: Model<Occupation> = model('occupations', occupations_schema);
export default OCUP;