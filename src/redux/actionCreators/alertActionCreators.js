import {SERVICE_URL,PARTNER_TOKEN} from '../../constants';
import {ADMIN_CREATE_ALERT, ADMIN_FETCH_ALERT_MESSAGES,CREATE_HELP_ALERT} from '../actionTypes';

//Test it
export const createHelpAlert = (latitude, longitude) => {
    return (dispatch, getState) => {
      const token = getState().auth.jwt;
  
      const url = `${SERVICE_URL}/residents/i-need-help`;
  
      return dispatch({
        type: CREATE_HELP_ALERT,
        payload: fetch(url, {
          body: JSON.stringify({latitude, longitude}),
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

export const createAlert = (data) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        console.log('alert data= ' +JSON.stringify(data));
        return dispatch({
            type: ADMIN_CREATE_ALERT,
            payload: fetch(`${SERVICE_URL}/alerts?tenant=${PARTNER_TOKEN}`, {
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

export const getAlertMessages = (alertId) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;

        return dispatch({
            type: ADMIN_FETCH_ALERT_MESSAGES,
            payload: fetch(`${SERVICE_URL}/messages?alert=${alertId}&tenant=${PARTNER_TOKEN}`, {
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
