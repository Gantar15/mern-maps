
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';

const RootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});
export default RootReducer;

export type RootReducer = ReturnType<typeof RootReducer>;