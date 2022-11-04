import CIcon from '@coreui/icons-react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLabel,
    CRow,
} from '@coreui/react';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Map from '../../../common/components/Map';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {
    deleteProperty,
    fetchProperty,
    fetchPropertyResidents,
} from '../../../redux/actionCreators/adminActionCreators';
import {
    clearPropertiesFromMap,
    clearResidentsFromMap,
    showPropertiesOnMap,
    showResidentsOnMap,
} from '../../../utils/mapUtils';
import PropertiesTooltip from '../../components/PropertiesTooltip';
import ResidentTooltip from '../../components/ResidentTooltip';
import {toastr} from 'react-redux-toastr';

const Property = ({match}) => {
    const dispatch = useDispatch();
    const [record, setRecord] = useState(null);
    const [residents, setResidents] = useState([]);

    const {map} = useContext(MapContext);

    useEffect(() => {
        if (match.params.id)
            dispatch(fetchProperty(match.params.id)).then(({value: record}) =>
                setRecord(record),
            );
        dispatch(
            fetchPropertyResidents(match.params.id),
        ).then(({value: residents}) => setResidents(residents));
    }, [dispatch, match.params.id]);

    const history = useHistory();

    const onClickDeleteRecord = useCallback(() => {
        toastr.confirm(
            'Are you sure you want to delete this property? This action is irreversible!',
            {
                onOk: () => {
                    dispatch(deleteProperty(match.params.id)).then(() => {
                        history.push('/admin/properties');
                    });
                },
            },
        );

    }, [dispatch, history, match.params.id]);

    const renderResidentsTooltip = useCallback(
        ({email, id}) => {
            return <ResidentTooltip email={email} id={id} history={history} />;
        },
        [history],
    );

    const renderPropertiesTooltip = useCallback(
        ({email, id}) => {
            return (
                <PropertiesTooltip email={email} id={id} history={history} />
            );
        },
        [history],
    );

    // Place property marker on map
    useEffect(() => {
        if (map && record) {
            showPropertiesOnMap(map, [record], renderPropertiesTooltip);

            map.setCenter([
                record.location.longitude,
                record.location.latitude,
            ]);
        }
        return () => {
            if (map) {
                clearPropertiesFromMap(map);
            }
        };
    }, [map, record, renderPropertiesTooltip]);

    // Place resident markers on map
    useEffect(() => {
        if (map) {
            showResidentsOnMap(map, residents, renderResidentsTooltip);
        }
        return () => {
            if (map) {
                clearResidentsFromMap(map);
            }
        };
    }, [map, renderResidentsTooltip, residents]);

    if (!record) return null;

    const data = {
        id: record.id,
        email: record.email,
        rural: record.rural ? 'Yes' : 'No',
        primaryAddress: record.primaryAddress ? 'Yes' : 'No',
        addressType: record.addressType,
        hightRiseOrCommercial: record.hightRiseOrCommercial ? 'Yes' : 'No',
        totalFloors:record.totalFloors,
        totalUnitsEachFloor:record.totalUnitsEachFloor,
        settlementType: record.settlementType,
    };

    data.unitNo = record.unitNo;
    data.postalCode = record.postalCode;
    data.streetNumber = record.streetNumber;
    data.route = record.route;
    data.locality = record.locality;

    if (record.rural) {
        data.lotNo = record.lotNo;
        data.plotNo = record.plotNo;
        data.region = record.region;
        data.province = record.province;
    }

    data.city = record.city;
    data.country = record.country;
    data.createdAt = record.createdAt;
    data.updatedAt = record.updatedAt;

    const userDetails = data
        ? Object.entries(data)
        : [
              [
                  'id',
                  <span>
                      <CIcon className="text-muted" name="cui-icon-ban" /> Not
                      found
                  </span>,
              ],
          ];

    return (
        <CRow>
            <CCol md={6}>
                <CCard>
                    <CCardHeader>
                        Record id: {match.params.id}
                        <div className="card-header-actions">
                            <CButton
                                onClick={onClickDeleteRecord}
                                className="btn-ghost-danger h-auto"
                                size={'sm'}>
                                Delete Property
                            </CButton>
                            <CButton
                                tag={Link}
                                to={`/admin/edit/property/${match.params.id}`}
                                className="btn-ghost-warning h-auto"
                                size={'sm'}>
                                Edit Property
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <h3>Property Details</h3>
                        <table className="table table-striped table-hover">
                            <tbody>
                                {userDetails.map(([key, value], index) => {
                                    return (
                                        <tr key={index.toString()}>
                                            <td>{`${key}:`}</td>
                                            <td>
                                                <strong>{value}</strong>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <h3>Residents of Property</h3>
                        <p className="text-muted">
                            You may not see users location on the map if user
                            haven't used mobile app.
                        </p>
                        <table className="table table-striped table-hover">
                            <tbody>
                                {record.users.map((u, index) => {
                                    return (
                                        <tr key={index.toString()}>
                                            <td>
                                                {u.email
                                                    ? u.email
                                                    : u.mobileNumber}
                                            </td>
                                            <td className="d-flex flex-column align-items-end">
                                                <Button
                                                    color={'primary'}
                                                    size={'sm'}
                                                    className="btn-ghost-primary"
                                                    onClick={() =>
                                                        history.push(
                                                            `/admin/users/${u.id}`,
                                                        )
                                                    }>
                                                    View User
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol md={6} className="pb-4 d-flex flex-column">
                <CLabel>Property location</CLabel>
                <div className="d-flex flex-fill">
                    <Map />
                </div>
            </CCol>
        </CRow>
    );
};

export default Property;
