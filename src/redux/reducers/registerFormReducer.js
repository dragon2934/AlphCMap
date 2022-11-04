import {ActionType} from 'redux-promise-middleware';
import {
    AUTH_REGISTER,
    REGISTER_PROPERTY,
    REGISTRATION_ADD_RESIDENT,
    REGISTRATION_RESET_FORM,
    SET_PROPERTY_REGISTRATION_FORM,
} from '../actionTypes';

const initialState = {};

const registerFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case `${AUTH_REGISTER}_${ActionType.Fulfilled}`:
            return {
                ...state,
                user: action.payload,
            };
        case `${REGISTER_PROPERTY}_${ActionType.Fulfilled}`: {
            return {
                ...state,
                property: action.payload,
            };
        }
        case `${REGISTRATION_ADD_RESIDENT}_${ActionType.Fulfilled}`: {
            if (!state.resident)
                return {
                    ...state,
                    resident: action.payload,
                };
            else
                return {
                    ...state,
                    residents: [...state.residents, action.payload],
                };
        }
        case REGISTRATION_RESET_FORM:
            return initialState;
        case `${SET_PROPERTY_REGISTRATION_FORM}_${ActionType.Fulfilled}`:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default registerFormReducer;
