import { ActionType } from 'redux-promise-middleware';
import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REGISTER,
    AUTH_RESET_PASSWORD_VERIFY,
    REGISTRATION_VERIFY_ACCOUNT,
    RESEND_EMAIL_VERIFICATION_CODE,
    RESEND_MOBILE_VERIFICATION_CODE,
    SET_AUTH,
    AUTH_GET_ME
} from '../actionTypes';

const initialState = {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case `${AUTH_GET_ME}_${ActionType.Fulfilled}`:
            console.log('..get me ..' + JSON.stringify(action.payload) + '.. state..' + JSON.stringify(state));
            return {
                ...state,
                user: {
                    ...action.payload
                },
                me: {
                    ...action.payload,
                }
            };
        case `${AUTH_LOGIN}_${ActionType.Fulfilled}`:
            return {
                ...action.payload,
            };
        case `${AUTH_LOGIN}_${ActionType.Rejected}`:
            return {};
        case `${AUTH_LOGIN}_${ActionType.Pending}`:
            return {
                pending: true,
            };

        case `${REGISTRATION_VERIFY_ACCOUNT}_${ActionType.Fulfilled}`:
        case `${RESEND_MOBILE_VERIFICATION_CODE}_${ActionType.Fulfilled}`:
        case `${RESEND_EMAIL_VERIFICATION_CODE}_${ActionType.Fulfilled}`:
        case `${AUTH_RESET_PASSWORD_VERIFY}_${ActionType.Fulfilled}`:
            if (action.payload.jwt)
                return {
                    ...state,
                    ...action.payload,
                };
            else return state;
        case `${AUTH_LOGOUT}_${ActionType.Fulfilled}`:
            return {};

        case `${AUTH_REGISTER}_${ActionType.Fulfilled}`:
            return {
                ...action.payload,
                // user: action.payload.user,
                me: {
                    ...action.payload.user
                }
            };

        case SET_AUTH:
            return action.payload;
        default:
            return state;
    }
};

export default authReducer;
