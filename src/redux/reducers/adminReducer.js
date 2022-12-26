import { ActionType } from 'redux-promise-middleware';
import {
    ADMIN_FETCH_ALERTS,
    ADMIN_FETCH_CONTACTS,
    ADMIN_FETCH_PROPERTIES,
    ADMIN_FETCH_ROLES,
    ADMIN_FETCH_USERS,
    ADMIN_SHOW_SIDEBAR,

} from '../actionTypes';

const initialState = {
    users: [],
    me: {},
    properties: [],
    contacts: [],
    roles: [],
    alerts: [],
    sidebarShow: 'responsive',
};

function adminReducer(state = initialState, action) {
    switch (action.type) {
        // Users
        case `${ADMIN_FETCH_USERS}_${ActionType.Pending}`:
            return {
                ...state,
                users: [],
            };
        case `${ADMIN_FETCH_USERS}_${ActionType.Fulfilled}`:
            return {
                ...state,
                users: action.payload,
            };
        // Properties
        case `${ADMIN_FETCH_PROPERTIES}_${ActionType.Pending}`:
            return {
                ...state,
                properties: [],
            };
        case `${ADMIN_FETCH_PROPERTIES}_${ActionType.Fulfilled}`:
            return {
                ...state,
                properties: action.payload,
            };
        // Contacts
        case `${ADMIN_FETCH_CONTACTS}_${ActionType.Pending}`:
            return {
                ...state,
                contacts: [],
            };
        case `${ADMIN_FETCH_CONTACTS}_${ActionType.Fulfilled}`:
            return {
                ...state,
                contacts: action.payload,
            };
        // Roles
        case `${ADMIN_FETCH_ROLES}_${ActionType.Fulfilled}`:
            return {
                ...state,
                roles: action.payload,
            };
        case `${ADMIN_FETCH_ROLES}_${ActionType.Rejected}`:
            return {
                ...state,
                roles: [],
            };
        // Alerts
        case `${ADMIN_FETCH_ALERTS}_${ActionType.Fulfilled}`:
            return {
                ...state,
                alerts: action.payload,
            };
        case `${ADMIN_FETCH_ALERTS}_${ActionType.Rejected}`:
            return {
                ...state,
                alerts: [],
            };

        // Others
        case ADMIN_SHOW_SIDEBAR:
            return {
                ...state,
                sidebarShow: action.payload,
            };
        default:
            return state;
    }
}

export default adminReducer;
