import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {isAdmin} from '../../utils/authUtils';

const AdminRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAdmin() ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default AdminRoute;
