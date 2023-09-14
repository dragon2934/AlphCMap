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
    deleteEvent,
    fetchEvent,
} from '../../../redux/actionCreators/adminActionCreators';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"


const Event = ({ match }) => {
    const dispatch = useDispatch();

    const [record, setRecord] = useState(null);


    useEffect(() => {
        if (match.params.id)
            dispatch(fetchEvent(match.params.id)).then(({ value: record }) => {
                console.log('...record..', record);
                const data = {
                    id: record.data.id,
                    ...record.data.attributes
                }
                setRecord(data);
            });
    }, [dispatch, match.params.id]);


    const history = useHistory();

    const onClickDeleteEvent = useCallback(() => {

        toastr.confirm(
            'Are you sure you want to delete this Event?',
            {
                onOk: () => {
                    dispatch(deleteEvent(match.params.id)).then(() => {
                        history.push('/admin/Events');
                    });
                },
            },
        );

    }, [dispatch, history, match.params.id, record]);



    if (!record) return null;

    const Event = {
        id: record.id,
        title: record.title,
        description: record.description,
        startDate: record.startDate,
        expireDate: record.expireDate,
        createdAt: record.createdAt
    };

    const EventDetails = Event
        ? Object.entries(Event)
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
                                                Event id: {match.params.id}
                                                <div className="card-header-actions">
                                                    <CButton
                                                        onClick={onClickDeleteEvent}
                                                        className="btn-ghost-danger h-auto"
                                                        size={'sm'}>
                                                        Delete Event
                                                    </CButton>
                                                    <CButton
                                                        tag={Link}
                                                        to={`/admin/edit/event/${match.params.id}`}
                                                        className="btn-ghost-warning h-auto"
                                                        size={'sm'}>
                                                        Edit Event
                                                    </CButton>
                                                </div>
                                            </CCardHeader>
                                            <CCardBody>
                                                <h3>Event Details</h3>
                                                <table className="table table-striped table-hover">
                                                    <tbody>
                                                        {EventDetails.map(([key, value], index) => {
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

export default Event;
