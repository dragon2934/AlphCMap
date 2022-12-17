import {ActionType} from 'redux-promise-middleware';
import {
    SET_EDIT_MODE,
    ADMIN_PROPERTY_BINDING,
    ADMIN_SEND_PROMOTE_EMAIL
} from '../actionTypes';

const initialState = {
    editMode: false,
    changeColor: false,
    emailForChangeColor:'',
    bindingProperty: false,
    selectedProperty: null,
    drawFinished: false,
    drawing: false,
};

function utilsDataReducer(state = initialState, action) {
    //  console.log('..action..' + JSON.stringify(action))
    switch (action.type) {
        // Users
        case SET_EDIT_MODE:
            console.log('..action..' + JSON.stringify(action));
            return {
                ...state,
                // ...action.payload,
            };
        case `${ADMIN_SEND_PROMOTE_EMAIL}_${ActionType.Fulfilled}`:
            return {
                ...state,
                ...action.payload,
            };
        case `${ADMIN_PROPERTY_BINDING}_${ActionType.Fulfilled}`:
            return {
                ...state,
                ...action.payload,
            };
        case 'CHANGE_PROPERTY_COLOR_FULFILLED':
            return {
                ...state,
                ...action.payload,
            };
        case 'CANCEL_CHANGE_PROPERTY_COLOR':
           return {
            ...state,
           };
        default:
            return state;
    }
}

export default utilsDataReducer;
