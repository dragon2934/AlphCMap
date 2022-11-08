import {ActionType} from 'redux-promise-middleware';
import {
    SET_EDIT_MODE,
} from '../actionTypes';

const initialState = {
    editMode: false,
};

function utilsDataReducer(state = initialState, action) {
    // console.log('..action..' + JSON.stringify(action))
    switch (action.type) {
        // Users
        case `${SET_EDIT_MODE}_${ActionType.Pending}`:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default utilsDataReducer;
