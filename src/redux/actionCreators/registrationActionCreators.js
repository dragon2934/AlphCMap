import {SERVICE_URL,PARTNER_TOKEN} from '../../constants';
import {
    AUTH_REGISTER,
    GET_INSTITUTE,
    REGISTER_PROPERTY,
    REGISTRATION_RESET_FORM,
    REGISTRATION_VERIFY_ACCOUNT,
    SET_PROPERTY_REGISTRATION_FORM,
    SET_EDIT_MODE,
} from '../actionTypes';

export const getInstitute = (email) => {
    return {
        type: GET_INSTITUTE,
        payload: fetch(`${SERVICE_URL}/institutions/allowed?tenant=${PARTNER_TOKEN}`, {
            method: 'POST',
            body: JSON.stringify({
                email,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
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

export const registerProperty = (data) => {
    return (dispatch) => {
        return dispatch({
            type: REGISTER_PROPERTY,
            payload: fetch(`${SERVICE_URL}/public/register-property?tenant=${PARTNER_TOKEN}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
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

export const verifyAccount = (data) => {
    return {
        type: REGISTRATION_VERIFY_ACCOUNT,
        payload: fetch(`${SERVICE_URL}/public/verify?tenant=${PARTNER_TOKEN}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
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

export const resetRegistrationForm = () => {
    return {
        type: REGISTRATION_RESET_FORM,
    };
};

export const registerUser = (data) => {
    console.log('Do registration, data=' + JSON.stringify(data));
    return {
        type: AUTH_REGISTER,
        payload: fetch(`${SERVICE_URL}/public/register?tenant=${PARTNER_TOKEN}`, {
            body: JSON.stringify(data),
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

export const setPropertyRegistrationForm = (data) => {
    return {
        type: SET_PROPERTY_REGISTRATION_FORM,
        payload: new Promise((resolve) => {
            // console.log('setPropertyRegistrationForm.....' + JSON.stringify(data));
            resolve(data);
        }),
    };
};

export const setEditMode = (data) => {
    return {
        type: SET_EDIT_MODE,
        payload: new Promise((resolve) => {
            // console.log('set edit mode.....' + JSON.stringify(data));
            resolve(data);
        }),
    };
};

export const isPropertyRegistered = (email) => {
    return (dispatch) => {
        return dispatch({
            type: REGISTER_PROPERTY,
            payload: fetch(`${SERVICE_URL}/public/is-property-registered?tenant=${PARTNER_TOKEN}`, {
                method: 'POST',
                body: JSON.stringify({email}),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
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

export const isMobileRegistered = (mobileNumber) => {
    return (dispatch) => {
        return dispatch({
            type: REGISTER_PROPERTY,
            payload: fetch(`${SERVICE_URL}/public/is-mobile-registered`, {
                method: 'POST',
                body: JSON.stringify({mobileNumber}),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
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
