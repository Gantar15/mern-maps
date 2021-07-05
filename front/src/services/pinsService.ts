import { AxiosResponse } from "axios";
import axiosInstance from "../http";
import type { IPin } from "../types/IPin";

interface PinRequest{
    user: string;
    title: string;
    desc: string;
    rating: number;
    lat: number;
    long: number;
}

export default class PinsService{
    static async fetchPins(): Promise<AxiosResponse<IPin[]>>{
        return axiosInstance.get<IPin[]>('/pins');
    }

    static async createPin(pinData: PinRequest): Promise<void>{
        axiosInstance.post('/pins', pinData);
    }
}