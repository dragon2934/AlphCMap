import React from "react";
import {Redirect, Route} from "react-router-dom";
import {hasLoggedIn} from '../../utils/authUtils';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                hasLoggedIn() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
