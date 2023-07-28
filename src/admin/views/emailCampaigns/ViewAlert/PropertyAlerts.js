import {CBadge, CDataTable} from '@coreui/react';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import MapContext from '../../../../common/contexts/MapContext/MapContext';
import {PropertyStatus} from '../../../../constants';
import {fetchPropertyAlerts} from '../../../../redux/actionCreators/adminActionCreators';
import {
    clearPropertiesFromMap,
    showPropertiesOnMap,
} from '../../../../utils/mapUtils';
import PropertiesTooltip from '../../../components/PropertiesTooltip';

const getBadge = (status) => {
    switch (status) {
        case PropertyStatus.SAFE:
            return 'success';
        case PropertyStatus.HAS_INJURED:
            return 'danger';
        // pending
        default:
            return 'secondary';
    }
};

const PropertyAlerts = ({alertId}) => {
    const [propertyAlerts, setPropertyAlerts] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const {map} = useContext(MapContext);

    // Fetch property alerts on mount
    useEffect(() => {
        dispatch(fetchPropertyAlerts(alertId)).then(({value}) => {
            setPropertyAlerts(value);
        });
    }, [alertId, dispatch]);

    // Fetch property alerts with interval
    useEffect(() => {
        const fetchData = () => {
            dispatch(fetchPropertyAlerts(alertId)).then(({value}) => {
                setPropertyAlerts(value);
            });
        };

        const handle = setInterval(fetchData, 10000);

        return () => {
            clearInterval(handle);
        };
    }, [alertId, dispatch]);

    const renderPropertiesTooltip = useCallback(
        ({email, id}) => {
            return (
                <PropertiesTooltip email={email} id={id} history={history} />
            );
        },
        [history],
    );

    // Place markers on map
    useEffect(() => {
        if (map && propertyAlerts.length) {
            showPropertiesOnMap(
                map,
                propertyAlerts.map((pa) => ({
                    ...pa.property,
                    property_alert: pa,
                })),
                renderPropertiesTooltip,
            );
        }
        return () => {
            if (map) {
                clearPropertiesFromMap(map);
            }
        };
    }, [map, propertyAlerts, renderPropertiesTooltip]);

    return (
        <CDataTable
            items={propertyAlerts
                .filter((pa) => pa.property)
                .map((pa) => ({
                    ...pa,
                    total_count: pa.user_alerts.length,
                    email: pa.property.email,
                    location: pa.property.location,
                    createdAt:pa.createdAt.toString().split('T')[0]
                }))}
            fields={[
                'status',
                'safe_count',
                'injured_count',
                'pending_count',
                'email',
                'createdAt'
            ]}
            scopedSlots={{
                status: (item) => (
                    <td>
                        <CBadge color={getBadge(item.status)}>
                            {item.status}
                        </CBadge>
                    </td>
                ),
                safe_count: (item) => (
                    <td>
                        {item.safe_count}/{item.total_count}
                    </td>
                ),
                injured_count: (item) => (
                    <td>
                        {item.injured_count}/{item.total_count}
                    </td>
                ),
                pending_count: (item) => (
                    <td>
                        {item.pending_count}/{item.total_count}
                    </td>
                ),
            }}
            onRowClick={(item) => {
                map.flyTo({
                    center: [item.location.longitude, item.location.latitude],
                    zoom: 15,
                });
            }}
            hover
            striped
            clickableRows
        />
    );
};

export default PropertyAlerts;
