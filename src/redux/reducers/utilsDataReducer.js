import {ActionType} from 'redux-promise-middleware';
import {
    SET_EDIT_MODE,
} from '../actionTypes';

const initialState = {
    editMode: false,
    changeColor: false,
    emailForChangeColor:''
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
