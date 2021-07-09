
import * as authActions from './authActions'; 
import * as userActions from './userActions'; 
import * as pinsActions from './pinsActions'; 

export default {
    ...authActions,
    ...userActions,
    ...pinsActions
};