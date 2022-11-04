import {SERVICE_URL,PARTNER_TOKEN} from '../../constants';
import {
    ADMIN_ADD_PROPERTY,
    ADMIN_ADD_USER,
    ADMIN_DELETE_ALERT,
    ADMIN_DELETE_CONTACTS,
    ADMIN_DELETE_PROPERTY,
    ADMIN_DELETE_USER,
    ADMIN_FETCH_ALERT,
    ADMIN_FETCH_ALERT_COUNT,
    ADMIN_FETCH_ALERTS,
    ADMIN_FETCH_CONTACT,
    ADMIN_FETCH_CONTACT_COUNT,
    ADMIN_FETCH_CONTACTS,
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

// Users

export const fetchUsers = ({page = 1, pageSize = 10}) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        const start = (page - 1) * pageSize;

        return dispatch({
            type: ADMIN_FETCH_USERS,
            payload: fetch(
                `${SERVICE_URL}/users?_start=${start}&_limit=${pageSize}&tenant=${PARTNER_TOKEN}`,
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
            payload: fetch(`${SERVICE_URL}/users/${id}?tenant=${PARTNER_TOKEN}`, {
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
            payload: fetch(`${SERVICE_URL}/users/count?tenant=${PARTNER_TOKEN}`, {
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
            payload: fetch(`${SERVICE_URL}/users/${id}?tenant=${PARTNER_TOKEN}`, {
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

        const url =`${SERVICE_URL}/residents/save-tenant?tenant=${PARTNER_TOKEN}`;

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
            ? `${SERVICE_URL}/users/${data.id}?tenant=${PARTNER_TOKEN}`
            : `${SERVICE_URL}/users?tenant=${PARTNER_TOKEN}`;

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
                `${SERVICE_URL}/users?_limit=10&mobileNumber_contains=${value}&tenant=${PARTNER_TOKEN}`,
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

// Properties
export const fetchProperties = ({page = 1, pageSize = 10,roleName = 'Admin'}) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        const start = (page - 1) * pageSize;
        let url = `${SERVICE_URL}/properties?_start=${start}&_limit=${pageSize}&tenant=${PARTNER_TOKEN}`;
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
            payload: fetch(`${SERVICE_URL}/properties/${params}?tenant=${PARTNER_TOKEN}`, {
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
            payload: fetch(`${SERVICE_URL}/users?property=${propertyId}&tenant=${PARTNER_TOKEN}`, {
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
            payload: fetch(`${SERVICE_URL}/properties/count?tenant=${PARTNER_TOKEN}`, {
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
            payload: fetch(`${SERVICE_URL}/properties/${id}?tenant=${PARTNER_TOKEN}`, {
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
            ? `${SERVICE_URL}/properties/${data.id}?tenant=${PARTNER_TOKEN}`
            : `${SERVICE_URL}/properties?tenant=${PARTNER_TOKEN}`;

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
// &tenant=${PARTNER_TOKEN}
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
            payload: fetch(`${SERVICE_URL}/alerts/${id}?tenant=${PARTNER_TOKEN}`, {
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

export const deleteAlert = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_DELETE_ALERT,
            payload: fetch(`${SERVICE_URL}/alerts/${id}?tenant=${PARTNER_TOKEN}`, {
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

// Contacts

export const fetchContacts = ({page = 1, pageSize = 10} = {}) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        const start = (page - 1) * pageSize;

        return dispatch({
            type: ADMIN_FETCH_CONTACTS,
            payload: fetch(
                `${SERVICE_URL}/contacts?_start=${start}&_limit=${pageSize}&tenant=${PARTNER_TOKEN}`,
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

export const fetchContact = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_CONTACT,
            payload: fetch(`${SERVICE_URL}/contacts/${id}?tenant=${PARTNER_TOKEN}`, {
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

export const fetchContactCount = () => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_CONTACT_COUNT,
            payload: fetch(`${SERVICE_URL}/contacts/count?tenant=${PARTNER_TOKEN}`, {
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

export const deleteContact = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_DELETE_CONTACTS,
            payload: fetch(`${SERVICE_URL}/contacts/${id}?tenant=${PARTNER_TOKEN}`, {
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
