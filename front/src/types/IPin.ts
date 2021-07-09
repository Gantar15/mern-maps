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
    _id: string;
}
export type {IPin};

interface IRequestPinData{
    user: string;
    title: string;
    desc: string;
    rating: number;
    lat: number;
    long: number;
}
export type {IRequestPinData};