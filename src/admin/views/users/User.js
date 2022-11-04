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
import {toastr} from 'react-redux-toastr';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import Map from '../../../common/components/Map';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {
    deleteUser,
    fetchProperty,
    fetchUser,
} from '../../../redux/actionCreators/adminActionCreators';
import {
    clearPropertiesFromMap,
    clearResidentsFromMap,
    showPropertiesOnMap,
    showResidentsOnMap,
} from '../../../utils/mapUtils';
import PropertiesTooltip from '../../components/PropertiesTooltip';
import ResidentTooltip from '../../components/ResidentTooltip';

const User = ({match}) => {
    const dispatch = useDispatch();

    const [record, setRecord] = useState(null);
    const [property, setProperty] = useState(null);

    const {map} = useContext(MapContext);

    useEffect(() => {
        if (match.params.id)
            dispatch(fetchUser(match.params.id)).then(({value: record}) =>
                setRecord(record),
            );
    }, [dispatch, match.params.id]);

    useEffect(() => {
        if (record && record.property) {
            dispatch(
                fetchProperty(record.property.id),
            ).then(({value: property}) => setProperty(property));
        }
    }, [dispatch, record]);

    const history = useHistory();

    const onClickDeleteUser = useCallback(() => {
        if (record.user_alert) {
            toastr.error(
                'Unsuccessful',
                'User is inside an active alert area. Please delete alert before deleting user.',
            );
        } else {
            toastr.confirm(
                'Are you sure you want to delete this account? This action is irreversible!',
                {
                    onOk: () => {
                        dispatch(deleteUser(match.params.id)).then(() => {
                            history.push('/admin/users');
                        });
                    },
                },
            );
        }
    }, [dispatch, history, match.params.id, record]);

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

    // Place resident marker on map
    useEffect(() => {
        if (map && record) {
            showResidentsOnMap(map, [record], renderResidentsTooltip);

            if (record.location.longitude) {
                map.setCenter([
                    record.location.longitude,
                    record.location.latitude,
                ]);
            }
        }
        return () => {
            if (map) {
                clearResidentsFromMap(map);
            }
        };
    }, [map, record, renderResidentsTooltip]);

    // Place property marker on map
    useEffect(() => {
        if (map && property) {
            showPropertiesOnMap(map, [property], renderPropertiesTooltip);
        }
        return () => {
            if (map) {
                clearPropertiesFromMap(map);
            }
        };
    }, [map, property, record, renderPropertiesTooltip]);

    if (!record) return null;

    const user = {
        id: record.id,
        email: record.email,
        username: record.username,
        mobileNumber: record.mobileNumber,
        role: record.role.name,
        firstName: record.firstName,
        lastName: record.lastName,
        property: record.property ? record.property.email : '',
        emailVerified: record.emailVerified.toString(),
        mobileVerified: record.mobileVerified.toString(),
        createdAt:record.createdAt
    };

    const userDetails = user
        ? Object.entries(user)
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
                        User id: {match.params.id}
                        <div className="card-header-actions">
                            <CButton
                                onClick={onClickDeleteUser}
                                className="btn-ghost-danger h-auto"
                                size={'sm'}>
                                Delete User
                            </CButton>
                            <CButton
                                tag={Link}
                                to={`/admin/edit/user/${match.params.id}`}
                                className="btn-ghost-warning h-auto"
                                size={'sm'}>
                                Edit User
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <h3>User Details</h3>
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
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol md={6} className="pb-4 d-flex flex-column">
                <CLabel>User location</CLabel>
                <div className="d-flex flex-fill">
                    <Map />
                </div>
            </CCol>
        </CRow>
    );
};

export default User;
