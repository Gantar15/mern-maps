import type { Schema } from "mongoose";


interface IUserDto{
    id: Schema.Types.ObjectId;
    email: string;
    isActivated: boolean;
}

export default class UserDto implements IUserDto{
    id: Schema.Types.ObjectId;
    email: string;
    isActivated: boolean;

    constructor(model: IUserDto){
        this.id = model.id;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}