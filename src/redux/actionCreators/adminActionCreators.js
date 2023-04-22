import { SERVICE_URL } from '../../constants';
import {
    ADMIN_ADD_PROPERTY,
    ADMIN_ADD_USER,
    ADMIN_DELETE_PROPERTY,
    ADMIN_DELETE_USER,
    ADMIN_FETCH_ALERT,
    ADMIN_FETCH_ALERT_COUNT,
    ADMIN_FETCH_ALERTS,
    ADMIN_FETCH_PROPERTIES,
    ADMIN_FETCH_PROPERTY,
    ADMIN_FETCH_PROPERTY_ALERT,
    ADMIN_FETCH_PROPERTY_COUNT,
    ADMIN_FETCH_PROPERTY_RESIDENTS,
    ADMIN_FETCH_ROLES,
    ADMIN_FETCH_USER,
    ADMIN_FETCH_USER_ALERT,
    ADMIN_FETCH_USER_COUNT,
    ADMIN_FETCH_USERS,
    ADMIN_SEARCH_USERS,
    ADMIN_SHOW_SIDEBAR,
    ADMIN_LIST_FILES,
    ADMIN_UPLOAD_FILE,
    ADMIN_UPDATE_LAT_LNG,
    ADMIN_SEARCH_PROPERTIES,
    ADMIN_FETCH_CITIES,
    ADMIN_FETCH_CITY,
    ADMIN_FETCH_CITY_COUNT,
    ADMIN_DELETE_CITY,
    ADMIN_ADD_CITY,
    ADMIN_PROPERTY_BINDING,
    ADMIN_SEND_PROMOTE_EMAIL,
    ADMIN_SAVE_BUSINESS_PROFILE,
    ADMIN_GET_BUSINESS_PROFILE,
    ADMIN_GET_BUSINESS_ADDRESS,
    ADMIN_SAVE_MERCHANT_CONNECTION,
    ADMIN_SAVE_SHOPPING_CART,
    ADMIN_LOAD_SHOPPING_CART,
    ADMIN_UNSUBSCRIBE,
    ADMIN_TOTAL_CONNECTED,
    ADMIN_CONFIRM_CONNECTION,
    ADMIN_GET_ADDRESS_BY_TYPE,
    ADMIN_CHECK_BUSINESS_PROFILE
} from '../actionTypes';

import { getLoginType } from '../../utils/utils';
// UI

export const setShowSidebar = (data) => {
    return (dispatch) => {
        return dispatch({
            type: ADMIN_SHOW_SIDEBAR,
            payload: data,
        });
    };
};


export const fetchCity = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_CITY,
            payload: fetch(`${SERVICE_URL}/cities/${id}`, {
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

export const saveCity = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        const url = data.id
            ? `${SERVICE_URL}/cities/${data.id}`
            : `${SERVICE_URL}/cities`;

        console.log('save city=' + JSON.stringify(data));
        return dispatch({
            type: ADMIN_ADD_CITY,
            payload: fetch(url, {
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: data.id ? 'PUT' : 'POST',
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
export const fetchCityCount = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_CITY_COUNT,
            payload: fetch(`${SERVICE_URL}/cities/count`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            })
                .then((r) => r.text())
                .then((responseData) => {
                    return responseData;
                }),
        });
    };
};
export const fetchCities = ({ page = 1, pageSize = 10 }) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        const start = (page - 1) * pageSize;

        return dispatch({
            type: ADMIN_FETCH_CITIES,
            payload: fetch(
                `${SERVICE_URL}/cities?_start=${start}&_limit=${pageSize}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'GET',
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
export const deleteCity = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_DELETE_CITY,
            payload: fetch(`${SERVICE_URL}/cities/${id}`, {
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

// Users

export const fetchUsers = ({ page = 1, pageSize = 10 }) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        const start = (page - 1) * pageSize;

        return dispatch({
            type: ADMIN_FETCH_USERS,
            payload: fetch(
                `${SERVICE_URL}/users?_start=${start}&_limit=${pageSize}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'GET',
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

export const fetchUser = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_USER,
            payload: fetch(`${SERVICE_URL}/users/${id}`, {
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

export const fetchUserCount = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_USER_COUNT,
            payload: fetch(`${SERVICE_URL}/users/count`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            })
                .then((r) => r.text())
                .then((responseData) => {
                    return responseData;
                }),
        });
    };
};

export const deleteUser = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_DELETE_USER,
            payload: fetch(`${SERVICE_URL}/users/${id}`, {
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


export const saveTenant = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        const url = `${SERVICE_URL}/residents/save-tenant`;

        console.log('save Tenant=' + JSON.stringify(data));
        return dispatch({
            type: ADMIN_ADD_USER,
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
export const saveUser = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        const url = data.id
            ? `${SERVICE_URL}/users/${data.id}`
            : `${SERVICE_URL}/users`;

        console.log('save user=' + JSON.stringify(data));
        return dispatch({
            type: ADMIN_ADD_USER,
            payload: fetch(url, {
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: data.id ? 'PUT' : 'POST',
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

export const searchUsers = (value) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_SEARCH_USERS,
            payload: fetch(
                `${SERVICE_URL}/users?_limit=10&mobileNumber_contains=${value}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'GET',
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

///properties/search-by-keyword
export const searchProperties = (keywords, searchType, cityShorName) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        let url = `${SERVICE_URL}/properties/search-by-keyword`;

        const data = {
            keywords: keywords,
            searchType: searchType,
            cityShorName: cityShorName
        }
        return dispatch({
            type: ADMIN_SEARCH_PROPERTIES,
            payload: fetch(
                url,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
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

// Properties
export const fetchProperties = ({ page = 1, pageSize = 10, roleName = 'Admin' }) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        const user = getState().auth.user;
        if (user === null || user === undefined) {
            const responseData = {
                statusCode: 200,
                value: []
            }
            return responseData;
        }
        const mobile = user.mobileNumber;
        const start = (page - 1) * pageSize;
        let url = `${SERVICE_URL}/properties?_start=${start}&_limit=${pageSize}&filters[$and][0][ownerMobileNumber][$eq]=${mobile}`;
        if (roleName == 'PropertyManager') {
            url = url + '&hidden=false'
        }
        // console.log('fetchProperties=' + url);

        return dispatch({
            type: ADMIN_FETCH_PROPERTIES,
            payload: fetch(
                url,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'GET',
                },
            )
                .then((r) => r.json())
                .then((responseData) => {
                    if (responseData.statusCode >= 300) {
                        return Promise.reject(responseData);
                    } else {
                        return responseData.data;
                    }
                }),
        });
    };
};
export const fetchPropertiesByLandlordId = (landlordId) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        let url = `${SERVICE_URL}/properties/get-by-landlord-id?landlordId=${landlordId}`;

        return dispatch({
            type: ADMIN_FETCH_PROPERTIES,
            payload: fetch(
                url,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'GET',
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


export const fetchProperty = (param) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        const params = Array.isArray(param)
            ? '?' +
            new URLSearchParams(
                param.map((id) => {
                    return ['id_in', id];
                }),
            )
            : param;

        return dispatch({
            type: ADMIN_FETCH_PROPERTY,
            payload: fetch(`${SERVICE_URL}/properties/${params}`, {
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

export const fetchPropertyResidents = (propertyId) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_PROPERTY_RESIDENTS,
            payload: fetch(`${SERVICE_URL}/users?property=${propertyId}`, {
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

export const fetchPropertyCount = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_PROPERTY_COUNT,
            payload: fetch(`${SERVICE_URL}/properties/count`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            })
                .then((r) => r.text())
                .then((responseData) => {
                    return responseData;
                }),
        });
    };
};

export const deleteProperty = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_DELETE_PROPERTY,
            payload: fetch(`${SERVICE_URL}/properties/${id}`, {
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

export const saveProperty = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        const url = data.id
            ? `${SERVICE_URL}/properties/${data.id}`
            : `${SERVICE_URL}/properties`;

        return dispatch({
            type: ADMIN_ADD_PROPERTY,
            payload: fetch(url, {
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: data.id ? 'PUT' : 'POST',
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

// Alerts
// 
export const fetchAlerts = ({ page = 1, pageSize = 10 }) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        const start = (page - 1) * pageSize;

        return dispatch({
            type: ADMIN_FETCH_ALERTS,
            payload: fetch(
                `${SERVICE_URL}/alerts?_start=${start}&_limit=${pageSize}&status=1`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'GET',
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

export const fetchAlert = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_ALERT,
            payload: fetch(`${SERVICE_URL}/alerts/${id}`, {
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

export const fetchAlertCount = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_ALERT_COUNT,
            payload: fetch(`${SERVICE_URL}/alerts/count?status=1`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            })
                .then((r) => r.text())
                .then((responseData) => {
                    return responseData;
                }),
        });
    };
};

export const fetchPropertyAlerts = (alertId) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_PROPERTY_ALERT,
            payload: fetch(`${SERVICE_URL}/property-alerts?alert=${alertId}`, {
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

export const fetchUserAlerts = (alertId) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_USER_ALERT,
            payload: fetch(`${SERVICE_URL}/user-alerts?alert=${alertId}`, {
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



// Roles

export const fetchRoles = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_ROLES,
            payload: fetch(`${SERVICE_URL}/users-permissions/roles`, {
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
                        return responseData.roles;
                    }
                }),
        });
    };
};


export const listFiles = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_LIST_FILES,
            payload: fetch(`${SERVICE_URL}/upload/files?_limit=10&_start=0&_sort=updatedAt:DESC`, {
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

export const uploadFiles = (fileData) => {
    return (dispatch, getState) => {
        // const token = getState().auth.jwt;
        let formData = new FormData();

        formData.append("files", fileData);
        return dispatch({
            type: ADMIN_UPLOAD_FILE,
            payload: fetch(`${SERVICE_URL}/upload`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: formData,
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

export const updateProperty = (fileName, fileUrl) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        const data = {
            fileName: fileName,
            fileUrl: fileUrl
        }
        return dispatch({
            type: ADMIN_UPLOAD_FILE,
            payload: fetch(`${SERVICE_URL}/properties/update-by-filename`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify(data),
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

///
export const updateLatLng = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        const data = {

        }
        return dispatch({
            type: ADMIN_UPDATE_LAT_LNG,
            payload: fetch(`${SERVICE_URL}/properties/update-lat-lng`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify(data),
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

export const propertyBinding = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_PROPERTY_BINDING,
            payload: fetch(`${SERVICE_URL}/properties/binding`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify(data),
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

export const sendPromotionContents = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_SEND_PROMOTE_EMAIL,
            payload: fetch(`${SERVICE_URL}/residents/send-promote-email`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify(data),
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

export const saveBusinessProfile = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_SAVE_BUSINESS_PROFILE,
            payload: fetch(`${SERVICE_URL}/business-profiles/save-business-profile`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify(data),
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

export const getBusinessProfile = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_GET_BUSINESS_PROFILE,
            payload: fetch(`${SERVICE_URL}/public/load-business-profile`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
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
export const getBusinessProfileByConnectToken = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_GET_BUSINESS_PROFILE,
            payload: fetch(`${SERVICE_URL}/public/load-business-profile-by-token`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
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

export const loadBusinessAddress = (data) => {


    return ({
        type: ADMIN_GET_BUSINESS_ADDRESS,
        payload: fetch(`${SERVICE_URL}/public/load-business-address`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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
export const loadConnected = (data) => {

    const loginType = getLoginType();
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        return dispatch({
            type: ADMIN_GET_BUSINESS_ADDRESS,
            payload: fetch(`${SERVICE_URL}/residents/load-connected?loginType=` + loginType, {
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
export const saveMerchantConnection = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_SAVE_MERCHANT_CONNECTION,
            payload: fetch(`${SERVICE_URL}/residents/connect-merchant`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify(data),
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

// /api/shopping-carts

export const saveShoppingCart = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_SAVE_SHOPPING_CART,
            payload: fetch(`${SERVICE_URL}/shopping-carts`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify(data),
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

export const loadShoppingCart = (userId) => {

    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        return dispatch({
            type: ADMIN_LOAD_SHOPPING_CART,
            payload: fetch(`${SERVICE_URL}/shopping-carts?filters[$and][0][users_id][$eq]=` + userId, {
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

export const disConnectionMerchant = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_SAVE_MERCHANT_CONNECTION,
            payload: fetch(`${SERVICE_URL}/residents/disconnect-merchant`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify(data),
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

export const unSubscribeMerchant = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_UNSUBSCRIBE,
            payload: fetch(`${SERVICE_URL}/public/unsubscribe`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
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

export const loadConnectedTotal = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_TOTAL_CONNECTED,
            payload: fetch(`${SERVICE_URL}/public/total-connected`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
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

export const confirmConnection = (data) => {
    return (dispatch, getState) => {

        return dispatch({
            type: ADMIN_CONFIRM_CONNECTION,
            payload: fetch(`${SERVICE_URL}/public/confirm-connected`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
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

export const getAddressByType = (loginType) => {

    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        return dispatch({
            type: ADMIN_GET_ADDRESS_BY_TYPE,
            payload: fetch(`${SERVICE_URL}/residents/get-address-by-type?type=` + loginType, {
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

export const checkBusinessProfile = () => {

    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        return dispatch({
            type: ADMIN_CHECK_BUSINESS_PROFILE,
            payload: fetch(`${SERVICE_URL}/residents/check-business-profile`, {
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
export const sendPasswordBeforeDeleteAccount = () => {

    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        return dispatch({
            type: ADMIN_CHECK_BUSINESS_PROFILE,
            payload: fetch(`${SERVICE_URL}/residents/send-password-before-delete-account`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify({})
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

