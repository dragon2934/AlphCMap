import { SERVICE_URL } from '../../constants';
import {
    ADMIN_FETCH_PRODDUCT_DETAIL,
    STRIPE_CHECKOUT_SESSION
} from '../actionTypes';

export const fetchProductDetails = (id) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        const stripeUrl = SERVICE_URL.replace('/api', '');

        return dispatch({
            type: ADMIN_FETCH_PRODDUCT_DETAIL,
            payload: fetch(`${stripeUrl}/strapi-stripe/getProduct/${id}`, {
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

export const createStripeSession = (productInfo) => {
    return (dispatch, getState) => {
        const token = getState().auth.jwt;
        const stripeUrl = SERVICE_URL.replace('/api', '');
        return dispatch({
            type: STRIPE_CHECKOUT_SESSION,
            payload: fetch(`${stripeUrl}/strapi-stripe/createCheckoutSession/`, {
                body: JSON.stringify({
                    stripePriceId: productInfo.stripePriceId,
                    stripePlanId: productInfo.stripePlanId,
                    isSubscription: productInfo.isSubscription,
                    productId: productInfo.id,
                    productName: productInfo.title,
                }),
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
                        return responseData;
                    }
                }),
        });
    };
};