
import { AuthActionTypes } from "../actions";
import { Dispatch } from "redux";
import { IReducerAction } from "../../types/IReducerAction";
import AuthService from "../../services/authService";
import { AuthResponse } from "../../types/AuthResponse";


export const setAuthAction = (payload: boolean) => {
    return {
        type: AuthActionTypes.SET_AUTH,
        payload
    };
};

export const loginAction = (payload: {
    email: string;
    password: string;
 }) => {
    return async (dispatch: Dispatch<IReducerAction<AuthResponse>>) => {
        try{
            const response = await AuthService.login(payload.email, payload.password);
            dispatch({
                type: AuthActionTypes.LOGIN,
                payload: response.data
            });
        } catch(err){
            console.log(err?.response?.data?.message);
        }
    };
};

export const registrationAction = (payload: {
    email: string;
    password: string;
    username: string;
 }) => {
    return async (dispatch: Dispatch<IReducerAction<AuthResponse>>) => {
        try{
            const response = await AuthService.registration(payload.username, payload.email, payload.password);
            dispatch({
                type: AuthActionTypes.REGISTRATION,
                payload: response.data
            });
        } catch(err){
            console.log(err?.response?.data?.message);
        }
    };
};

export const logoutAction = () => {
    return async (dispatch: Dispatch<IReducerAction<undefined>>) => {
        try{
            await AuthService.logout();
            dispatch({
                type: AuthActionTypes.LOGOUT,
                payload: undefined
            });
        } catch(err){
            console.log(err?.response?.data?.message);
        }
    };
};