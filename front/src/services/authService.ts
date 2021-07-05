import { AxiosResponse } from "axios";
import axiosInstance from "../http";
import type { AuthResponse } from "../types/AuthResponse";

export default class AuthService{
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return axiosInstance.post<AuthResponse>('/login', {email, password});
    }

    static async logout(): Promise<void>{
        axiosInstance.get('/logout');
    }

    static async registration(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return axiosInstance.post<AuthResponse>('/registration', {username, email, password});
    }
}