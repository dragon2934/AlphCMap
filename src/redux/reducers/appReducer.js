import {ActionType} from 'redux-promise-middleware';
import {
    AUTH_LOGIN,
    GET_USER_LOCATION,
    RESEND_EMAIL_VERIFICATION_CODE,
    RESEND_MOBILE_VERIFICATION_CODE,
    TOGGLE_VERIFICATION_MODAL,
} from '../actionTypes';

const initialState = {
    showVerificationModal: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case `${GET_USER_LOCATION}_${ActionType.Fulfilled}`:
            return {
                ...state,
                location: action.payload,
            };
        case `${GET_USER_LOCATION}_${ActionType.Pending}`:
            return {
                ...state,
                location: {pending: true},
            };
        case `${GET_USER_LOCATION}_${ActionType.Rejected}`:
            return {
                ...state,
                location: {},
            };
        case `${AUTH_LOGIN}_${ActionType.Fulfilled}`:
        case `${RESEND_MOBILE_VERIFICATION_CODE}_${ActionType.Fulfilled}`:
        case `${RESEND_EMAIL_VERIFICATION_CODE}_${ActionType.Fulfilled}`:
            if (action.payload.jwt) {
                const user = action.payload.user;

                const userHasEmail = user.username !== user.email;

                const userVerified =
                    (userHasEmail &&
                        user.emailVerified &&
                        user.mobileVerified) ||
                    (!userHasEmail && user.mobileVerified);

                return {
                    ...state,
                    showVerificationModal: !userVerified,
                };
            } else return state;
        case TOGGLE_VERIFICATION_MODAL:
            return {
                ...state,
                showVerificationModal: !state.showVerificationModal,
            };

        case 'persist/REHYDRATE': {
            try {
                const user = action.payload.auth.user;

                const userHasEmail = user.username !== user.email;

                const userVerified =
                    (userHasEmail &&
                        user.emailVerified &&
                        user.mobileVerified) ||
                    (!userHasEmail && user.mobileVerified);

                return {
                    ...state,
                    showVerificationModal: !userVerified,
                };
            } catch (_) {
                return state;
            }
        }
        default:
            return state;
    }
};

export default authReducer;
