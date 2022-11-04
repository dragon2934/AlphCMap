import {SERVICE_URL,PARTNER_TOKEN} from '../../constants';
import {
    AUTH_CHANGE_PASSWORD_ALT,
    AUTH_CHANGE_PASSWORD,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_RESET_PASSWORD,
    AUTH_RESET_PASSWORD_VERIFY,
} from '../actionTypes';
import md5 from 'md5';
export const loginUser = (identifier, password) => {
    return {
        type: AUTH_LOGIN,
        payload: fetch(`${SERVICE_URL}/public/login?tenant=${PARTNER_TOKEN}`, {
            body: JSON.stringify({
                identifier,
                password,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })
            .then((r) => r.json())
            .then((responseData) => {
                if (responseData.statusCode >= 300) {
                    return Promise.reject(responseData);
                } else {
                    return responseData;
                }
            }),
    };
};

export const logoutUser = () => {
    return {
        type: AUTH_LOGOUT,
        payload: new Promise((resolve) => resolve()),
    };
};

export const changePassword = (password) => {
    return (dispatch, getState) => {
        let token = getState().auth.jwt;
        console.log('password: =' +password + ' token=' + token);
        return dispatch({
            type: AUTH_CHANGE_PASSWORD,
            payload: fetch(`${SERVICE_URL}/residents/change-password?tenant=${PARTNER_TOKEN}`, {
                body: JSON.stringify({
                    password,
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
            })
                .then((r) => r.json())
                .then((responseData) => {
                    if (responseData.statusCode >= 300) {
                        return Promise.reject(responseData);
                    } else {
                        return responseData;
                    }
                }),
        });
    };
};


export const iOSChangePassword = (mobileNumber,password) => {
    const hash = md5('29'+mobileNumber+'34'+password+'046');
    return (dispatch) => {   
        return dispatch({
            type: AUTH_CHANGE_PASSWORD_ALT,
            payload: fetch(`${SERVICE_URL}/public/ios-change-password?tenant=${PARTNER_TOKEN}`, {
                body: JSON.stringify({
                    mobileNumber,
                    password,
                    hash
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            })
                .then((r) => r.json())
                .then((responseData) => {
                    if (responseData.statusCode >= 300) {
                        return Promise.reject(responseData);
                    } else {
                        return responseData;
                    }
                }),
        });
    };
    
};

export const resetPassword = (mobileNumber) => {
    return (dispatch) => {
        return dispatch({
            type: AUTH_RESET_PASSWORD,
            payload: fetch(`${SERVICE_URL}/public/reset-password?tenant=${PARTNER_TOKEN}`, {
                body: JSON.stringify({
                    mobileNumber,
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            })
                .then((r) => r.json())
                .then((responseData) => {
                    if (responseData.statusCode >= 300) {
                        return Promise.reject(responseData);
                    } else {
                        return responseData;
                    }
                }),
        });
    };
};

export const verifyResetPassword = (mobileNumber, mobileVerificationCode) => {
    return (dispatch) => {
        return dispatch({
            type: AUTH_RESET_PASSWORD_VERIFY,
            payload: fetch(`${SERVICE_URL}/public/verify-reset-password?tenant=${PARTNER_TOKEN}`, {
                body: JSON.stringify({
                    mobileNumber,
                    mobileVerificationCode,
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            })
                .then((r) => r.json())
                .then((responseData) => {
                    if (responseData.statusCode >= 300) {
                        return Promise.reject(responseData);
                    } else {
                        return responseData;
                    }
                }),
        });
    };
};
