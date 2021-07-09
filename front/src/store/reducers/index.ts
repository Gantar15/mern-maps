
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import pinsReducer from './pinsReducer';

const RootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    pins: pinsReducer
});
export default RootReducer;

export type RootReducer = ReturnType<typeof RootReducer>;