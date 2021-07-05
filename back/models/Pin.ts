
import { Schema, model, Date } from "mongoose";

interface IPin{
    user: Schema.Types.ObjectId;
    title: string;
    desc: string;
    rating: number;
    lat: number;
    long: number;
    createdAt: Date;
    updatedAt: Date;
    save: Function;
}
export type {IPin};

const pinSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        require: true,
        minLength: 3
    },
    desc: {
        type: String,
        require: true,
        minLength: 3
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5
    },
    lat: {
        type: Number,
        require: true
    },
    long: {
        type: Number,
        require: true
    }
}, {
    timestamps: true,
    skipVersioning: true
});

export default model('Pin', pinSchema);