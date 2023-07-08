import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLabel,
    CRow,
} from '@coreui/react';
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";

import {
    deleteUser,
    fetchUser,
} from '../../../redux/actionCreators/adminActionCreators';
import Header from '../../../site/pages/newHome/Header';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"

const Template = ({ match }) => {
    const dispatch = useDispatch();

    const [record, setRecord] = useState(null);


    useEffect(() => {
        if (match.params.id)
            dispatch(fetchUser(match.params.id)).then(({ value: record }) =>
                setRecord(record),
            );
    }, [dispatch, match.params.id]);


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



    if (!record) return null;

    const user = {
        id: record.id,
        email: record.email,
        username: record.username,
        mobileNumber: record.mobileNumber,
        role: record.role.name,
        firstName: record.firstName,
        lastName: record.lastName,
        // property: record.property ? record.property.email : '',
        // emailVerified: record.emailVerified.toString(),
        // mobileVerified: record.mobileVerified.toString(),
        createdAt: record.createdAt
    };

    const userDetails = user
        ? Object.entries(user)
        : [
            [
                'id',
                <span>
                    Not
                    found
                </span>,
            ],
        ];

    return (
        <div className="c-app c-default-layout">
            <TheSidebar />
            <div className="c-wrapper">

                <TheHeader />
                <div className="c-body">
                    <main className="c-main">
                        <CContainer fluid className={'h-100'}>
                            <div className="content">
                                <CRow>
                                    <CCol md={12}>
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

                                </CRow>
                            </div>
                        </CContainer>
                    </main>
                </div>
                <TheFooter />
            </div>
        </div>
    );
};

export default Template;
