
import type { IReducerAction } from '../../types/IReducerAction';
import type { IUser } from '../../types/IUser';
import {UserActionTypes} from '../actions';


const defaultStore: IUser = {} as IUser;

export default function userReducer(store = defaultStore, action: IReducerAction<any>): IUser{
    switch(action.type){
        case UserActionTypes.SET_USER:
            return action.payload;
    }

    return store;
};