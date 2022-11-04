// import CIcon from '@coreui/icons-react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CLabel,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
    CTabs,
} from '@coreui/react';

import bbox from '@turf/bbox';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Map from '../../../common/components/Map';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {
    fetchPropertyAlerts,
    fetchAlert,
    fetchUserAlerts,
} from '../../../redux/actionCreators/adminActionCreators';
import {
    clearPropertiesFromMap,
    showPropertiesOnMap,
    clearDistancesFromMap,
    clearResidentsFromMap,
    showDistancesOnMap,
    showResidentsOnMap,
} from '../../../utils/mapUtils';
import {AlertStatus} from '../../../constants';
// import PropertyAlerts from './ViewAlert/PropertyAlerts';
// import UserAlerts from './ViewAlert/UserAlerts';
// import {toastr} from 'react-redux-toastr';
import PublicPropertiesTooltip from '../../../site/components/PublicPropertiesTooltip';
import PublicResidentTooltip from '../../../site/components/PublicResidentTooltip';


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
const MobileViewAlert = ({match}) => {
   
    const [propertyAlerts, setPropertyAlerts] = useState([]);
    const [userAlerts, setUserAlerts] = useState([]);

    const [alert, setAlert] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const {map} = useContext(MapContext);

    useEffect(() => {
        try {
            document.querySelector('body').style.marginTop = 0;
            document.querySelector('#root').style.height = '100%';
            document.querySelector('.content').style.height = '100%';
        } catch (e) {}
    });

    // Fetch alert
    useEffect(() => {
        if (match.params.id){
            console.log('start fetch alert, id=' + match.params.id);
            dispatch(fetchAlert(match.params.id)).then(({value: alert}) => {
                console.log('alert is:' + JSON.stringify(alert));
                setAlert(alert);
            });
        }
    }, [dispatch, match.params.id]);

    // Place boundaries on map
    useEffect(() => {
        if (map && alert) {
            const {geojson} = alert;
            console.log('geo json=' + JSON.stringify(geojson));

            const alertBounds = bbox(geojson);
            map.fitBounds(alertBounds, {padding: 20, animate: false});

            map.addSource('alert-boundary', {
                type: 'geojson',
                data: geojson,
            });
            map.addLayer({
                id: 'alert-boundary',
                type: 'fill',
                source: 'alert-boundary',
                layout: {},
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.8,
                },
            });

            return () => {
                if (map.getLayer('alert-boundary'))
                    map.removeLayer('alert-boundary');
                if (map.getSource('alert-boundary'))
                    map.removeSource('alert-boundary');
            };
        }
    }, [alert, map]);

    /////Property Alert
        // Fetch property alerts on mount
        useEffect(() => {
            dispatch(fetchPropertyAlerts(match.params.id)).then(({value}) => {
                setPropertyAlerts(value);
            });
        }, [match.params.id, dispatch]);
    
        // Fetch property alerts with interval
        useEffect(() => {
            const fetchData = () => {
                dispatch(fetchPropertyAlerts(match.params.id)).then(({value}) => {
                    setPropertyAlerts(value);
                });
            };
    
            const handle = setInterval(fetchData, 10000);
    
            return () => {
                clearInterval(handle);
            };
        }, [match.params.id, dispatch]);
    
        const renderPropertiesTooltip = useCallback(
            ({email, id}) => {
                return (
                    <PublicPropertiesTooltip email={email} id={id} history={history} />
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
 // user alert
    // Fetch user alerts on mount
    useEffect(() => {
        dispatch(fetchUserAlerts(match.params.id)).then(({value}) => {
            setUserAlerts(value);
        });
        // dispatch(fetchPropertyAlerts(alertId)).then(({value}) => {
        //     setPropertyAlerts(value);
        // });
    }, [match.params.id, dispatch]);

    // Fetch user alerts with interval
    useEffect(() => {
        const fetchData = () => {
            dispatch(fetchUserAlerts(match.params.id)).then(({value}) => {
                setUserAlerts(value);
            });
        };

        const handle = setInterval(fetchData, 10000);

        return () => {
            clearInterval(handle);
        };
    }, [match.params.id, dispatch]);

    const renderResidentsTooltip = useCallback(
        ({email,location,user, id}) => {
            return <PublicResidentTooltip email={email} id={id} location={location} user={user} history={history} />;
        },
        [history],
    );

    const findPropertyId=(ua) =>{
        let alertProperty = propertyAlerts.find(
            (pa) => pa.property.id === ua.user.property,
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



    if (!alert) return null;

    return (
        <CRow className="h-100">
            
            <CCol  className="pb-4 d-flex flex-column">
                
                <div className="d-flex flex-fill">
                    <Map />
                </div>
            </CCol>
        </CRow>
    );
};

export default MobileViewAlert;
