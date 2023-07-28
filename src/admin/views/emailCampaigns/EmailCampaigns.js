import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CPagination,
    CRow,
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
    fetchAlertCount,
    fetchEmailCampaigns,
} from '../../../redux/actionCreators/adminActionCreators';
import Moment from 'moment';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"

const PAGE_SIZE = 10;

const EmailCampaigns = () => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const currentUser = useSelector((state) => state.auth.me);
    const pageChange = (newPage) => {
        if (!newPage) {
            history.push(`/admin/alerts?page=1`);
        } else {
            currentPage !== newPage &&
                history.push(`/admin/alerts?page=${newPage}`);
        }
    };

    useEffect(() => {
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    const dispatch = useDispatch();
    const [emailCampaigns, setEmailCampaigns] = useState([]);
    // const alerts = useSelector((state) => state.admin.alerts).map((u) => ({
    //     mobileNumber: u.mobileNumber,
    //     id: u.id,
    //     sender: u.sender,
    //     name: u.name,
    //     createdAt: Moment(u.createdAt.toString()).format('YYYY-MM-DD HH:mm:SS')
    // }));

    useEffect(() => {
        setLoading(true);
        dispatch(fetchEmailCampaigns(currentUser.id, { page, pageSize: 1000000 }))
            .then(resp => {
                console.log('...data..', resp);
            })
            .finally(() =>
                setLoading(false),
            );
        return () => { };
    }, [dispatch, page]);

    // useEffect(() => {
    //     dispatch(fetchAlertCount()).then(({ value: count }) =>
    //         setCount(parseInt(count)),
    //     );
    //     return () => { };
    // }, [dispatch]);

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
                                                Email Campaigns

                                                <div className="card-header-actions">
                                                    <CButton
                                                        tag={Link}
                                                        to={'/admin/email-campaigns/new'}
                                                        className="btn-ghost-primary h-auto"
                                                        size={'sm'}
                                                        color="primary">
                                                        New Email Campaign
                                                    </CButton>
                                                </div>
                                            </CCardHeader>
                                            <CCardBody>
                                                <CDataTable
                                                    items={emailCampaigns}
                                                    loading={loading}
                                                    fields={[
                                                        {
                                                            key: 'mobileNumber', _classes: 'font-weight-bold'
                                                        },
                                                        'sender',
                                                        // 'mobileNumber',
                                                        'name',
                                                        'createdAt'
                                                    ]}
                                                    hover
                                                    sorter
                                                    striped
                                                    tableFilter={{ 'placeholder': 'Keywords...' }}
                                                    itemsPerPage={PAGE_SIZE}
                                                    pagination
                                                    clickableRows
                                                    onRowClick={(item) =>
                                                        history.push(`/admin/email-campaigns/${item.id}`)
                                                    }
                                                />
                                                {
                                                    // parseInt(count / PAGE_SIZE) ? (
                                                    //     <CPagination
                                                    //         activePage={page}
                                                    //         size={'sm'}
                                                    //         onActivePageChange={pageChange}
                                                    //         doubleArrows={false}
                                                    //         pages={parseInt(Math.ceil(count / PAGE_SIZE))}
                                                    //         align="end"
                                                    //     />
                                                    // ) : null
                                                }
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

export default EmailCampaigns;
