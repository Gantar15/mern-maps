
import type { IReducerAction } from '../../types/IReducerAction';
import type { IPin } from '../../types/IPin';
import {PinsActionTypes} from '../actions';


const defaultStore: IPin[] = [];

export default function pinsReducer(store = defaultStore, action: IReducerAction<any>): IPin[]{
    switch(action.type){
        case PinsActionTypes.SET_PINS:
            return action.payload;
    }

    return store;
};