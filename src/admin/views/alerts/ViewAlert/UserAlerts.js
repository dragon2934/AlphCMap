import {CBadge, CButton, CDataTable} from '@coreui/react';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import MapContext from '../../../../common/contexts/MapContext/MapContext';
import {AlertStatus} from '../../../../constants';
import {
    fetchPropertyAlerts,
    fetchUserAlerts,
} from '../../../../redux/actionCreators/adminActionCreators';
import {startMessaging} from '../../../../redux/actionCreators/messagingActionCreators';
import {
    clearDistancesFromMap,
    clearResidentsFromMap,
    showDistancesOnMap,
    showResidentsOnMap,
} from '../../../../utils/mapUtils';
import ResidentTooltip from '../../../components/ResidentTooltip';

const getBadge = (status) => {
    switch (status) {
        case AlertStatus.SAFE:
            return 'success';
        case AlertStatus.INJURED:
            return 'danger';
        case AlertStatus.AWAY:
            return 'warning';
        // pending
        default:
            return 'secondary';
    }
};

const UserAlerts = ({alertId}) => {
    const [userAlerts, setUserAlerts] = useState([]);
    const [propertyAlerts, setPropertyAlerts] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const {map} = useContext(MapContext);

    // Fetch user alerts on mount
    useEffect(() => {
        dispatch(fetchUserAlerts(alertId)).then(({value}) => {
            console.log('......user alert...' + JSON.stringify(value));
            setUserAlerts(value);
        });
        dispatch(fetchPropertyAlerts(alertId)).then(({value}) => {
            console.log('...Property Alert...' + JSON.stringify(value));
            setPropertyAlerts(value);
        });
    }, [alertId, dispatch]);

    // Fetch user alerts with interval
    useEffect(() => {
        const fetchData = () => {
            dispatch(fetchUserAlerts(alertId)).then(({value}) => {
                setUserAlerts(value);
            });
        };

        const handle = setInterval(fetchData, 10000);

        return () => {
            clearInterval(handle);
        };
    }, [alertId, dispatch]);

    const renderResidentsTooltip = useCallback(
        ({email,location,user, id}) => {
            return <ResidentTooltip email={email} id={id} location={location} user={user} history={history} />;
        },
        [history],
    );

    const findPropertyId=(ua) =>{
        let alertProperty = propertyAlerts.find(
            (pa) => ua.user!=null && ua.user!=undefined && pa.property!=null && pa.property!=undefined && pa.property.id === ua.user.property,
        );
        if(alertProperty===null || alertProperty===undefined){
            alertProperty = propertyAlerts[0];
        }
        return alertProperty.property;
    }
    // Place markers on map
    useEffect(() => {
        if (map && userAlerts.length && propertyAlerts.length) {
            showResidentsOnMap(
                map,
                userAlerts.map((ua) => ({...ua.user, user_alert: ua})),
                renderResidentsTooltip,
            );
            
            showDistancesOnMap(
                map,
                userAlerts.map((ua) => ({
                    ...ua.user,
                    user_alert: ua,
                    property: findPropertyId(ua),
                })),
            );
        }
        return () => {
            if (map) {
                clearResidentsFromMap(map);
                clearDistancesFromMap(map);
            }
        };
    }, [map, propertyAlerts, renderResidentsTooltip, userAlerts]);

    return (
        <CDataTable
            items={userAlerts
                .sort((a, b) =>
                    a.unreadMessageCount < b.unreadMessageCount ? 1 : -1,
                )
                .filter((i) => i.user)
                .map((ua) => ({
                    alertId,
                    propertyAlertId: ua.property_alert.id,
                    userAlertId: ua.id,
                    userId: ua.user.id,
                    user: ua.user,

                    status: ua.status,
                    unreadMessageCount: ua.unreadMessageCount,
                    ...ua.user,
                }))
                .filter((i) => i)}
            fields={['status', 'email', 'actions']}
            scopedSlots={{
                status: (item) => (
                    <td>
                        <CBadge color={getBadge(item.status)}>
                            {item.status}
                        </CBadge>
                    </td>
                ),
                actions: (item) => (
                    <td>
                        <CButton
                            type="submit"
                            size="sm"
                            color={
                                item.unreadMessageCount > 0
                                    ? 'danger'
                                    : 'success'
                            }
                            onClick={() => {
                                dispatch(
                                    startMessaging(
                                        item.alertId,
                                        item.propertyAlertId,
                                        item.userAlertId,
                                        item.userId,
                                        item.user,
                                    ),
                                );
                            }}>
                            <i className="fa fa-comment" /> (
                            {item.unreadMessageCount})
                        </CButton>
                    </td>
                ),
            }}
            onRowClick={(item) => {
                if (item.location.longitude) {
                    map.flyTo({
                        center: [
                            item.location.longitude,
                            item.location.latitude,
                        ],
                        zoom: 15,
                    });
                }
            }}
            hover
            striped
            clickableRows
        />
    );
};

export default UserAlerts;
