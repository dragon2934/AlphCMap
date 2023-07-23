import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Map from '../../../common/components/Map';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {
    // fetchProperties,
    fetchUsers,
    loadConnected
} from '../../../redux/actionCreators/adminActionCreators';
import {
    clearDistancesFromMap,
    clearPropertiesFromMap,
    clearResidentsFromMap,
    showDistancesOnMap,
    showPropertiesOnMap,
    showResidentsOnMap,
} from '../../../utils/mapUtils';
import PropertiesTooltip from '../../components/PropertiesTooltip';
import ResidentTooltip from '../../components/ResidentTooltip';
import { convertAttributes, convertLocation } from '../../../utils/utils';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_GL_ACCESS_TOKEN;

class PropertiesMap extends Component {
    static contextType = MapContext;

    state = {
        mapInitialized: false,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { map } = this.context;
        const { mapInitialized } = this.state;
        if (!mapInitialized && map) {
            this.initializeLayers();

            this.setState({
                mapInitialized: true,
            });
        }
    }

    componentWillUnmount() {
        const { map } = this.context;
        if (map) {
            clearPropertiesFromMap(map);
            clearResidentsFromMap(map);
            clearDistancesFromMap(map);
        }
    }

    renderResidentsTooltip = ({ id, email }) => {
        const { history } = this.props;

        return <ResidentTooltip email={email} id={id} history={history} />;
    };

    renderPropertiesTooltip = ({ id, email }) => {
        const { history } = this.props;

        return <PropertiesTooltip email={email} id={id} history={history} />;
    };

    async initializeLayers() {
        const { map } = this.context;
        const { loadConnected, fetchUsers } = this.props;

        const { value: properties } = await loadConnected();
        const { value: residents } = await fetchUsers();

        const data = convertLocation(properties.value);
        console.log('.....properties.. ', data)
        showPropertiesOnMap(map, data, this.renderPropertiesTooltip, false);
        // showResidentsOnMap(map, residents, this.renderResidentsTooltip);
        // showDistancesOnMap(map, residents);
    }

    render() {
        return (
            <div className="h-100 d-flex">
                <Map />
            </div>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    // fetchProperties: () =>
    //     dispatch(fetchProperties({ page: 1, pageSize: 100000 })),
    fetchUsers: () => dispatch(fetchUsers({ page: 1, pageSize: 100000 })),
    loadConnected: (data) =>
        dispatch(loadConnected(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(PropertiesMap));
