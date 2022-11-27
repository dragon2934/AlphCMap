import {SERVICE_URL,PARTNER_TOKEN} from '../../constants';
import {getNavigatorLocation} from '../../utils/mapUtils';
import {
    DELETE_ACCOUNT,
    DELETE_INMATE,
    FETCH_INMATES,
    GET_USER_LOCATION,
    GET_USER_PROPERTY,
    RESEND_EMAIL_VERIFICATION_CODE,
    RESEND_MOBILE_VERIFICATION_CODE,
    SAVE_INMATE,
    SAVE_USER_PROPERTY,
    SEND_CONTACT_FORM,
    TOGGLE_VERIFICATION_MODAL,
    UPDATE_ACCOUNT,
    FETCH_USER_PROPERTIES,
    SAVE_ADDITIONAL_ADDRESS,
    DELETE_ADDITIONAL_ADDRESS,
    SAVE_USER_PROPERTIES_DATA,
    SAVE_SECONDORY_PROPERTY,
    CHANGE_PROPERTY_COLOR,
    CANCEL_CHANGE_PROPERTY_COLOR
} from '../actionTypes';


export const getUserLocation = () => {
    return {
        type: GET_USER_LOCATION,
        payload: getNavigatorLocation(),
    };
};

export const sendContactForm = (data) => {
    if(data!=null && data!=undefined){
        data['tenant'] = PARTNER_TOKEN;
        console.log('send contact form' + JSON.stringify(data));
    }
    return (dispatch) => {
        return dispatch({
            type: SEND_CONTACT_FORM,
            payload: fetch(`${SERVICE_URL}/contacts/saveContactUs?tenant=${PARTNER_TOKEN}`, {
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
        });
    };
};

export const changePropertyColor = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        return dispatch({
            type: CHANGE_PROPERTY_COLOR,
            payload: fetch(`${SERVICE_URL}/residents/change-property-color`, {
                body: JSON.stringify(data),
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
export const cancelChangePropertyColor = () => {
    return {
        type: CANCEL_CHANGE_PROPERTY_COLOR,
    };
};


export const deleteAccount = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: DELETE_ACCOUNT,
            payload: fetch(`${SERVICE_URL}/residents/delete-account`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'DELETE',
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

export const fetchInmates = (propertyId) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: FETCH_INMATES,
            payload: fetch(`${SERVICE_URL}/residents/inmateslistById?propertyId=${propertyId}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
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

export const deleteUserAdditionalAddress = (userPropertyId,propertyId) =>{
    console.log('1=' + userPropertyId + '2=' + propertyId);
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: DELETE_ADDITIONAL_ADDRESS,
            payload: fetch(`${SERVICE_URL}/user-properties/delete-user-property`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userPropertyId:userPropertyId,
                    propertyId:propertyId
                }),
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
}
export const deleteUserAdditionalAddressById = (propertyId) =>{
    console.log( '2=' + propertyId);
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: DELETE_ADDITIONAL_ADDRESS,
            payload: fetch(`${SERVICE_URL}/user-properties/delete-user-property-by-id`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    propertyId:propertyId
                }),
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
}
export const fetchUserProperties = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: FETCH_USER_PROPERTIES,
            payload: fetch(`${SERVICE_URL}/user-properties/list-all`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
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

export const getInmate = (id,propertyId) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: FETCH_INMATES,
            payload: fetch(`${SERVICE_URL}/residents/inmates/get/${id}?propertyId=`+propertyId, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
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

export const saveInmate = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        const url = data.id
            ? `${SERVICE_URL}/residents/inmates/save/${data.id}?tenant=${PARTNER_TOKEN}`
            : `${SERVICE_URL}/residents/inmates/save?tenant=${PARTNER_TOKEN}`;

        return dispatch({
            type: SAVE_INMATE,
            payload: fetch(url, {
                body: JSON.stringify(data),
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

export const deleteInmate = (id,propertyId) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: DELETE_INMATE,
            payload: fetch(`${SERVICE_URL}/residents/inmates/delete/${id}?propertyId=${propertyId}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'DELETE',
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

export const getUserPropertyById = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: GET_USER_PROPERTY,
            payload: fetch(`${SERVICE_URL}/residents/property/get?id=${id}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
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
export const getUserProperty = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: GET_USER_PROPERTY,
            payload: fetch(`${SERVICE_URL}/residents/property/get`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
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

export const saveUserProperty = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: SAVE_USER_PROPERTY,
            payload: fetch(`${SERVICE_URL}/residents/property/save?tenant=${PARTNER_TOKEN}`, {
                body: JSON.stringify(data),
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


export const saveAdditionalAddress = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: SAVE_ADDITIONAL_ADDRESS,
            payload: fetch(`${SERVICE_URL}/user-properties/save-property`, {
                body: JSON.stringify(data),
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

export const saveUserPropertyData = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: SAVE_USER_PROPERTIES_DATA,
            payload: fetch(`${SERVICE_URL}/user-properties/save-user-property`, {
                body: JSON.stringify(data),
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

export const resendMobileVerificationCode = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: RESEND_MOBILE_VERIFICATION_CODE,
            payload: fetch(
                `${SERVICE_URL}/residents/resend-mobile-verification-code?tenant=${PARTNER_TOKEN}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'POST',
                },
            )
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

export const resendMobileVerificationCodeByMobileNumber = (mobileNumber) => {
    return (dispatch, getState) => {
        // const token = getState().auth.jwt;

        return dispatch({
            type: RESEND_MOBILE_VERIFICATION_CODE,
            payload: fetch(
                `${SERVICE_URL}/public/resend-mobile-verification-code-mobile-number?mobileNumber=${mobileNumber}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                },
            )
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

export const resendEmailVerificationCode = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: RESEND_EMAIL_VERIFICATION_CODE,
            payload: fetch(
                `${SERVICE_URL}/residents/resend-email-verification-code?tenant=${PARTNER_TOKEN}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'POST',
                },
            )
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

export const toggleVerificationModal = () => {
    return {type: TOGGLE_VERIFICATION_MODAL};
};

export const updateAccount = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: UPDATE_ACCOUNT,
            payload: fetch(`${SERVICE_URL}/residents/update/self?tenant=${PARTNER_TOKEN}`, {
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'PUT',
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

export const saveBatchProperties = (data) =>{
    // console.log('......saving batch 111...' + JSON.stringify(data));
    
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: SAVE_SECONDORY_PROPERTY,
            payload: fetch(`${SERVICE_URL}/residents/create-properties`, {
                body: JSON.stringify(data),
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
}