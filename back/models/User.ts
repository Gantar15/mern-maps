
import { Schema, model } from "mongoose";

interface IUser{
    id: Schema.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    isActivated: boolean;
    activationLink: string;
    save: Function;
}
export type {IUser};

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 50,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: String
}, {
    timestamps: true,
    skipVersioning: true
});

export default model('User', userSchema);