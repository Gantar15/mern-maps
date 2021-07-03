
import { Schema, model } from "mongoose";

interface IToken{
    user: Schema.Types.ObjectId;
    refreshToken: string;
    save: Function;
}
export type {IToken};

const tokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

export default model('Token', tokenSchema);