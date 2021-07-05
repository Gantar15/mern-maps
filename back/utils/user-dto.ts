import type { Schema } from "mongoose";


interface IUserDto{
    id: Schema.Types.ObjectId;
    email: string;
    isActivated: boolean;
    username: string;
}

export default class UserDto implements IUserDto{
    id: Schema.Types.ObjectId;
    email: string;
    isActivated: boolean;
    username: string;

    constructor(model: IUserDto){
        this.id = model.id;
        this.email = model.email;
        this.isActivated = model.isActivated;
        this.username = model.username;
    }
}