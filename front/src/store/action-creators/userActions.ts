
import {IUser} from '../../types/IUser';
import { UserActionTypes } from "../actions";


export const setUserAction = (payload: IUser) => {
    return {
        type: UserActionTypes.SET_USER,
        payload
    };
};