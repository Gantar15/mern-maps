import axiosInstance from "../http";
import type { IPin, IRequestPinData } from "../types/IPin";


export default class PinsService{
    static async fetchPins(): Promise<IPin[]>{
        return (await axiosInstance.get<IPin[]>('/pins')).data;
    }

    static async createPin(pinData: IRequestPinData): Promise<void>{
        await axiosInstance.post('/pins', pinData);
    }
}