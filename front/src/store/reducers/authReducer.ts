
import { AuthResponse } from '../../types/AuthResponse';
import type { IReducerAction } from '../../types/IReducerAction';
import {AuthActionTypes} from '../actions';


interface IAuthStore{
    isAuth: boolean;
    isLoading: boolean;
}
const defaultStore: IAuthStore = {
    isAuth: false,
    isLoading: false
};

export default function AuthReducer(store = defaultStore, action: IReducerAction<any>): IAuthStore{
    switch(action.type){
        case AuthActionTypes.SET_AUTH:
            return {
                ...store,
                isAuth: action.payload
            };

        case AuthActionTypes.SET_LOADING:
            return {
                ...store,
                isLoading: action.payload
            };

        case AuthActionTypes.LOGIN:{
            const data: AuthResponse = action.payload;
            localStorage.setItem('accessToken', data.accessToken);
            return store;
        }

        case AuthActionTypes.REGISTRATION:{
            const data: AuthResponse = action.payload;
            localStorage.setItem('accessToken', data.accessToken);
            return store;
        }

        case AuthActionTypes.LOGOUT:{
            localStorage.removeItem('accessToken');
            return store;
        }

        case AuthActionTypes.REFRESH:
            const data: AuthResponse = action.payload;
            localStorage.setItem('accessToken', data.accessToken);
            return store;
    }

    return store;
};