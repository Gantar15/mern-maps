
import { AuthActionTypes } from "../actions";
import { Dispatch } from "redux";
import { IReducerAction } from "../../types/IReducerAction";
import AuthService from "../../services/authService";
import { AuthResponse } from "../../types/AuthResponse";
import axios from 'axios';
import { API_URL } from "../../http";
import { setUserAction } from '../action-creators/userActions';
import { IUser } from "../../types/IUser";


export const setAuthAction = (payload: boolean) => {
    return {
        type: AuthActionTypes.SET_AUTH,
        payload
    };
};

export const setLoadingAction = (payload: boolean) => {
    return {
        type: AuthActionTypes.SET_LOADING,
        payload
    };
};

export const loginAction = (payload: {
    email: string;
    password: string;
 }) => {
    return async (dispatch: Dispatch<IReducerAction<AuthResponse | boolean | IUser>>) => {
        try{
            const response = await AuthService.login(payload.email, payload.password);
            dispatch(setAuthAction(true));
            dispatch(setUserAction(response.data.user));
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
    return async (dispatch: Dispatch<IReducerAction<AuthResponse | boolean | IUser>>) => {
        try{
            const response = await AuthService.registration(payload.username, payload.email, payload.password);
            dispatch(setAuthAction(true));
            dispatch(setUserAction(response.data.user));
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
    return async (dispatch: Dispatch<IReducerAction<undefined | boolean | IUser>>) => {
        try{
            await AuthService.logout();
            dispatch(setAuthAction(false));
            dispatch(setUserAction({} as IUser));
            dispatch({
                type: AuthActionTypes.LOGOUT,
                payload: undefined
            });
        } catch(err){
            console.log(err?.response?.data?.message);
        }
    };
};

export const refreshAction = () => {
    return async (dispatch: Dispatch<IReducerAction<AuthResponse | boolean | IUser>>) => {
        dispatch(setLoadingAction(true));
        try{
            const response = await axios.get<AuthResponse>(API_URL + 'users/refresh', {
                withCredentials: true
            });
            dispatch(setAuthAction(true));
            dispatch(setUserAction(response.data.user));
            dispatch({
                type: AuthActionTypes.REFRESH,
                payload: response.data
            });
        } catch(err){
            console.log(err?.response?.data?.message);
        } finally{
            dispatch(setLoadingAction(false));
        }
    };
};