import isPromise from 'is-promise';
import _ from 'underscore';
import {AUTH_LOGIN} from './actionTypes';

export default function errorMiddleware() {
    return (next) => (action) => {
        const types = {
            [AUTH_LOGIN]: true,
        };

        // If not a promise, continue on
        if (!isPromise(action.payload)) {
            return next(action);
        }

        if (_.has(types, action.type)) {
            // Dispatch initial pending promise, but catch any errors
            return next(action).catch((error) => {
                console.warn('Middleware', error);

                return error;
            });
        }

        return next(action);
    };
}
