
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
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";

import {
    deleteProperty,
    fetchProperty,

} from '../../../redux/actionCreators/adminActionCreators';
import Header from '../../../site/pages/newHome/Header';
import { toastr } from 'react-redux-toastr';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"

const Property = ({ match }) => {
    const dispatch = useDispatch();
    const [record, setRecord] = useState(null);

    useEffect(() => {
        if (match.params.id)
            dispatch(fetchProperty(match.params.id)).then(({ value: record }) =>
                setRecord(record),
            );
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



    if (!record) return null;

    const data = {
        id: record.id,
        address: record.address,
        area: record.area,
        serial_no: record.serial_no,
        application_form_url: record.application_form_url,
        plans_url: record.plans_url,
        acreage: record.acreage,

    };

    data.address = record.address;
    data.area = record.area;
    data.serial_no = record.serial_no;
    data.application_form_url = record.application_form_url;
    data.plans_url = record.plans_url;
    data.acreage = record.acreage;
    data.createdAt = record.createdAt;
    data.updatedAt = record.updatedAt;

    const userDetails = data
        ? Object.entries(data)
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
                                    <CCol md={10}>
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

export default Property;
