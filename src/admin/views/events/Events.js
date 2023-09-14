import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
} from '@coreui/react';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import {

    fetchEvents,
} from '../../../redux/actionCreators/adminActionCreators';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"


const PAGE_SIZE = 10;

const Events = () => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [Events, setEvents] = useState([]);
    const currentUser = useSelector((state) => state.auth.me);

    useEffect(() => {
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    const dispatch = useDispatch();
    // const Events = useSelector((state) => state.admin.Events);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchEvents(currentUser.id, { page, pageSize: 100000 })).then((resp_Events) => {
            console.log('Events..' + JSON.stringify(resp_Events));
            const data = resp_Events.value.data;
            const events = [];
            data.map(item => {
                events.push({
                    id: item.id,
                    ...item.attributes,
                    percentageInDiscount: item.attributes.percentageDiscount > 0 ? parseInt(item.attributes.percentageDiscount * 100) + '%' : ''
                })
            })
            console.log('..after convert..', events);
            setEvents(events);
        }).finally(() =>
            setLoading(false),
        );
        return () => { };
    }, [dispatch, page]);


    // console.log('itemsPerPageSelect = ' + PAGE_SIZE);
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
                                    <CCol>
                                        <CCard>
                                            <CCardHeader>
                                                Events
                                                <small className="text-muted"> Events</small>
                                                <div className="card-header-actions">
                                                    <CButton
                                                        tag={Link}
                                                        to={'/admin/events/new'}
                                                        className="btn-ghost-primary h-auto"
                                                        size={'sm'}
                                                        color="primary">
                                                        New Event
                                                    </CButton>
                                                </div>
                                            </CCardHeader>
                                            <CCardBody>
                                                <CDataTable
                                                    items={Events}
                                                    loading={loading}
                                                    fields={[
                                                        { key: 'title', label: 'Title', _classes: 'font-weight-bold' },
                                                        { key: 'description', label: 'Description' },
                                                        'startDate',
                                                        'expireDate',
                                                        'createdAt'
                                                    ]}
                                                    hover
                                                    striped
                                                    sorter
                                                    tableFilter={{ 'placeholder': 'Keywords...' }}
                                                    itemsPerPage={PAGE_SIZE}
                                                    pagination
                                                    clickableRows
                                                    onRowClick={(item) =>
                                                        history.push(`/admin/Events/${item.id}`)
                                                    }
                                                />
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

export default Events;
