'use strict';

import moment from 'moment';
import { Model, model, Document, Schema } from 'mongoose';

export interface Recognition extends Document {
    author: Schema.Types.ObjectId;
    title: string;
    age: number;
    text: string;
    createdAt: number;
    updatedAt: number;
}

const recognitions_schema: Schema<Recognition> = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'authors'
    },
    title: {
        type: String,
        required: [true, 'Es obligatorio introducir un título del reconocimiento.'],
    },
    age: {
        type: Number
    },
    text: {
        type: String,
    },
    createdAt: Number,
    updatedAt: Number
}, {
    timestamps: {
        currentTime: () => moment().unix()
    }
});

const RECOG: Model<Recognition> = model('recognitions', recognitions_schema);
export default RECOG;