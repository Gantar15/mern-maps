import { IUser } from "./IUser";

interface IPin{
    user: IUser;
    title: string;
    desc: string;
    rating: number;
    lat: number;
    long: number;
    createdAt: Date;
    updatedAt: Date;
}

export type {IPin};