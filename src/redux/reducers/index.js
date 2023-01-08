import { reducer as toastr } from 'react-redux-toastr';
import { combineReducers } from 'redux';
import admin from './adminReducer';
import app from './appReducer';

import auth from './authReducer';
import messaging from './messagingReducer';
import registerForm from './registerFormReducer';
import utilsData from './utilsDataReducer';
import cartData from './CartReducer';

const rootReducer = combineReducers({
    toastr,
    auth,
    app,
    registerForm,
    admin,
    messaging,
    utilsData,
    cartData
});

export default rootReducer;
