import CIcon from '@coreui/icons-react';
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
    deleteAlert,
    fetchAlert,
} from '../../../redux/actionCreators/adminActionCreators';
import PropertyAlerts from './ViewAlert/PropertyAlerts';
import UserAlerts from './ViewAlert/UserAlerts';
import {toastr} from 'react-redux-toastr';

const ViewAlert = ({match}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [alert, setAlert] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const {map} = useContext(MapContext);

    // Fetch alert
    useEffect(() => {
        if (match.params.id)
            dispatch(fetchAlert(match.params.id)).then(({value: alert}) => {
                setAlert(alert);
            });
    }, [dispatch, match.params.id]);

    // Place boundaries on map
    useEffect(() => {
        if (map && alert) {
            const {geojson} = alert;

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

    const onClickDeleteAlert = useCallback(() => {
        toastr.confirm(
            'Are you sure you want to delete this alert? This action is irreversible!',
            {
                onOk: () => {
                    dispatch(deleteAlert(match.params.id)).then(() => {
                        history.push('/admin/alerts');
                    });
                },
            },
        );

    }, [dispatch, history, match.params.id]);

    if (!alert) return null;

    return (
        <CRow className="h-100">
            <CCol md={6}>
                <CCard>
                    <CCardHeader>
                        {match.params.id
                            ? `Record id: ${match.params.id}`
                            : 'New Alert'}
                        <div className="card-header-actions">
                            <CButton
                                onClick={onClickDeleteAlert}
                                className="btn-ghost-danger h-auto"
                                size={'sm'}>
                                Delete Alert
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CTabs
                            activeTab={activeTab}
                            onActiveTabChange={(idx) => setActiveTab(idx)}>
                            <CNav variant="tabs">
                                <CNavItem>
                                    <CNavLink>
                                        <CIcon name="cil-home" />
                                        {activeTab === 0 && ' Properties'}
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink>
                                        <CIcon name="cil-phone" />
                                        {activeTab === 1 && ' Responses'}
                                    </CNavLink>
                                </CNavItem>
                            </CNav>
                            <CTabContent>
                                <CTabPane>
                                    <PropertyAlerts
                                        alertId={alert.id}
                                        active={activeTab === 0}
                                    />
                                </CTabPane>
                                <CTabPane>
                                    <UserAlerts
                                        alertId={alert.id}
                                        active={activeTab === 1}
                                    />
                                </CTabPane>
                            </CTabContent>
                        </CTabs>
                    </CCardBody>
                    <CCardFooter className="text-right" />
                </CCard>
            </CCol>
            <CCol md={6} className="pb-4 d-flex flex-column">
                <CLabel>Alert Area</CLabel>
                <div className="d-flex flex-fill">
                    <Map />
                </div>
            </CCol>
        </CRow>
    );
};

export default ViewAlert;
