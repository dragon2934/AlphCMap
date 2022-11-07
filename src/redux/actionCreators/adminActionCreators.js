import {SERVICE_URL} from '../../constants';
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
    ADMIN_ADD_CITY
} from '../actionTypes';

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
export const fetchCities = ({page = 1, pageSize = 10}) => {
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

export const fetchUsers = ({page = 1, pageSize = 10}) => {
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

        const url =`${SERVICE_URL}/residents/save-tenant`;

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
export const searchProperties = (keywords, searchType,cityShorName) => {
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
export const fetchProperties = ({page = 1, pageSize = 10,roleName = 'Admin'}) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        const user = getState().auth.user;
        if(user === null || user === undefined){
            const responseData ={
                statusCode:200,
                value:[]
            }
            return responseData;
        }
        const mobile = user.mobileNumber;
        const start = (page - 1) * pageSize;
        let url = `${SERVICE_URL}/properties?_start=${start}&_limit=${pageSize}&ownerMobileNumber=${mobile}`;
        if(roleName=='PropertyManager'){
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
                        return responseData;
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
export const fetchAlerts = ({page = 1, pageSize = 10}) => {
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
                        return responseData.roles;
                    }
                }),
        });
    };
};

export const uploadFiles = () => {
    return (dispatch, getState) => {
        // const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_UPLOAD_FILE,
            payload: fetch(`${SERVICE_URL}/upload`, {
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
                        return responseData.roles;
                    }
                }),
        });
    };
};

export const updateProperty = (fileName,fileUrl) => {
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
                        return responseData.roles;
                    }
                }),
        });
    };
};

///
export const updateLatLng = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        const data ={
            
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
                body:JSON.stringify(data),
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