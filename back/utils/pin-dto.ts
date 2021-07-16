import type { Schema, Date } from "mongoose";
import { IPin } from "../models/Pin";
import { IUser } from "../models/User";
import { IUserDto } from "./user-dto";

export default class PinDto{
    user: IUserDto;
    _id: Schema.Types.ObjectId;
    title: string;
    desc: string;
    rating: number;
    lat: number;
    long: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(model: IPin){
        this._id = model._id;
        this.user = {
            id: (model.user as IUser).id,
            email: (model.user as IUser).email, 
            isActivated: (model.user as IUser).isActivated,
            username: (model.user as IUser).username,
        };
        this.title = model.title;
        this.desc = model.desc;
        this.rating = model.rating;
        this.lat = model.lat;
        this.long = model.long;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }
}