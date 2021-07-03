
import { Schema, model } from "mongoose";


const pinSchema = new Schema({
    username: {
        type: String,
        require: true
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