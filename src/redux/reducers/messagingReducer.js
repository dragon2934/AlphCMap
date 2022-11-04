import {ActionType} from 'redux-promise-middleware';
import {
    CLOSE_MESSAGING_STACK,
    FETCH_USER_ALERT_MESSAGES,
    TOGGLE_MAXIMIZE_MESSAGING_STACK,
    TOGGLE_MINIMIZE_MESSAGING_STACK,
    SEND_TEMP_MESSAGE,
    START_MESSAGING,
} from '../actionTypes';

const initialState = {};

function messagingReducer(state = initialState, action) {
    switch (action.type) {
        case START_MESSAGING: {
            return {
                ...state,
                [action.payload.userAlertId]: {
                    minimized: false,
                    maximized: false,

                    alertId: action.payload.alertId,
                    propertyAlertId: action.payload.propertyAlertId,
                    userAlertId: action.payload.userAlertId,
                    userId: action.payload.userId,
                    user: action.payload.user,

                    messages: [],
                },
            };
        }
        case TOGGLE_MINIMIZE_MESSAGING_STACK: {
            const messagingData = state[action.payload.userAlertId];

            return {
                ...state,
                [action.payload.userAlertId]: {
                    ...messagingData,
                    minimized: !messagingData.minimized,
                },
            };
        }
        case TOGGLE_MAXIMIZE_MESSAGING_STACK: {
            const messagingData = state[action.payload.userAlertId];

            return {
                ...state,
                [action.payload.userAlertId]: {
                    ...messagingData,
                    maximized: !messagingData.maximized,
                    minimized: false,
                },
            };
        }
        case CLOSE_MESSAGING_STACK: {
            return {
                ...Object.keys(state)
                    .filter(
                        (userAlertId) =>
                            userAlertId !== action.payload.userAlertId,
                    )
                    .map((userAlertId) => [userAlertId, state[userAlertId]])
                    .reduce(
                        (acc, pair) => ({
                            ...acc,
                            [pair[0]]: pair[1],
                        }),
                        {},
                    ),
            };
        }
        case `${FETCH_USER_ALERT_MESSAGES}_${ActionType.Fulfilled}`: {
            const messagingData = state[action.payload.userAlertId];

            if (!messagingData) return state;

            return {
                ...state,
                [action.payload.userAlertId]: {
                    ...messagingData,
                    messages: action.payload.messages,
                },
            };
        }

        case SEND_TEMP_MESSAGE: {
            const messagingData = state[action.payload.userAlertId];

            return {
                ...state,
                [action.payload.userAlertId]: {
                    ...messagingData,
                    messages: [...messagingData.messages, action.payload],
                },
            };
        }
        default:
            return state;
    }
}

export default messagingReducer;
