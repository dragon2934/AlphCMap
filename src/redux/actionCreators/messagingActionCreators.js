import {SERVICE_URL,PARTNER_TOKEN} from '../../constants';
import {
    CLOSE_MESSAGING_STACK,
    FETCH_USER_ALERT_MESSAGES,
    SEND_MESSAGE,
    SEND_TEMP_MESSAGE,
    SET_USER_ALERT_MESSAGES_READ,
    START_MESSAGING,
    TOGGLE_MAXIMIZE_MESSAGING_STACK,
    TOGGLE_MINIMIZE_MESSAGING_STACK,
} from '../actionTypes';

export const toggleMinimizeMessageStack = (userAlertId) => {
    return (dispatch) => {
        return dispatch({
            type: TOGGLE_MINIMIZE_MESSAGING_STACK,
            payload: {
                userAlertId,
            },
        });
    };
};

export const toggleMaximizeMessageStack = (userAlertId) => {
    return (dispatch) => {
        return dispatch({
            type: TOGGLE_MAXIMIZE_MESSAGING_STACK,
            payload: {
                userAlertId,
            },
        });
    };
};

export const closeMessageStack = (userAlertId) => {
    return (dispatch) => {
        return dispatch({
            type: CLOSE_MESSAGING_STACK,
            payload: {
                userAlertId,
            },
        });
    };
};

export const startMessaging = (
    alertId,
    propertyAlertId,
    userAlertId,
    userId,
    user,
) => {
    return (dispatch) => {
        return dispatch({
            type: START_MESSAGING,
            payload: {alertId, propertyAlertId, userAlertId, userId, user},
        });
    };
};

export const getUserAlertMessages = (userAlertId) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: FETCH_USER_ALERT_MESSAGES,
            payload: fetch(
                `${SERVICE_URL}/messages?user_alert=${userAlertId}&tenant=${PARTNER_TOKEN}`,
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
                        return {
                            userAlertId,
                            messages: responseData,
                        };
                    }
                }),
        });
    };
};

export const setUserAlertMessagesRead = (userAlertId) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: SET_USER_ALERT_MESSAGES_READ,
            payload: fetch(`${SERVICE_URL}/user-alerts/${userAlertId}?tenant=${PARTNER_TOKEN}`, {
                body: JSON.stringify({
                    unreadMessageCount: 0,
                }),
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

export const sendMessage = (userAlertId, text) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        const messagingData = getState().messaging[userAlertId];

        const newMessage = {
            to: messagingData.userId,
            text,
            alert: messagingData.alertId,
            property_alert: messagingData.propertyAlertId,
            user_alert: userAlertId,
        };

        dispatch({
            type: SEND_TEMP_MESSAGE,
            payload: {
                ...newMessage,
                id: 'temp',
                userAlertId,
                temporary: true,
            },
        });

        const url = `${SERVICE_URL}/messages?tenant=${PARTNER_TOKEN}`;

        return dispatch({
            type: SEND_MESSAGE,
            payload: fetch(url, {
                body: JSON.stringify(newMessage),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
            })
                .then((r) => r.json())
                .then((responseData) => {
                    dispatch(getUserAlertMessages(userAlertId));
                    return responseData;
                })
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
