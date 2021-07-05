
import useActions from '../../hooks/useActions';
import type { IReducerAction } from '../../types/IReducerAction';
import type { IUser } from '../../types/IUser';
import {AuthActionTypes} from '../actions';


interface IAuthStore{
    isAuth: boolean
}
const defaultStore: IAuthStore = {
    isAuth: false
};

export default function authReducer(store = defaultStore, action: IReducerAction<any>): IAuthStore{
    const {setAuthAction, setUserAction} = useActions();

    switch(action.type){
        case AuthActionTypes.SET_AUTH:
            return {
                ...store,
                isAuth: action.payload
            };

        case AuthActionTypes.LOGIN:{
            const data = action.payload;
            localStorage.setItem('accessToken', data.accessToken);
            setAuthAction(true);
            setUserAction(data.user);
            return store;
        }

        case AuthActionTypes.REGISTRATION:{
            const data = action.payload;
            localStorage.setItem('accessToken', data.accessToken);
            setAuthAction(true);
            setUserAction(data.user);
            return store;
        }

        case AuthActionTypes.LOGOUT:{
            localStorage.removeItem('accessToken');
            setAuthAction(false);
            setUserAction({} as IUser);
            return store;
        }

        case AuthActionTypes.REFRESH:
            return store;
    }

    return store;
};