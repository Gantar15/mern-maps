import { AxiosResponse } from "axios";
import axiosInstance from "../http";
import type { AuthResponse } from "../types/AuthResponse";

export default class AuthService{
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return axiosInstance.post<AuthResponse>('/users/login', {email, password});
    }

    static async logout(): Promise<void>{
        axiosInstance.get('/users/logout');
    }

    static async registration(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return axiosInstance.post<AuthResponse>('/users/registration', {username, email, password});
    }
}