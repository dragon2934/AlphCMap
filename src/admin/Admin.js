import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import MapProvider from '../common/contexts/MapContext/MapProvider';
import '../styles/admin/style.scss';

import {icons} from './assets/icons';
import Messaging from './components/Messaging';

React.icons = icons;

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

class Admin extends Component {
    render() {
        const {match} = this.props;

        return (
            <MapProvider>
                <Route
                    path={`${match.url}/`}
                    name="Home"
                    render={(props) => <TheLayout {...props} />}
                />
                <Messaging />
            </MapProvider>
        );
    }
}

export default Admin;
