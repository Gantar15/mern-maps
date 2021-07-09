
import { IPin } from "../../types/IPin";
import { PinsActionTypes } from "../actions";


export const setPinsAction = (payload: IPin[]) => {
    return {
        type: PinsActionTypes.SET_PINS,
        payload
    };
};