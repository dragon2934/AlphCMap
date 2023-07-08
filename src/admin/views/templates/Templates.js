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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import {
    fetchUserCount,
    fetchUsers,
} from '../../../redux/actionCreators/adminActionCreators';
import Header from '../../../site/pages/newHome/Header';

const PAGE_SIZE = 10;

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"

React.icons = icons;

const Templates = () => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);


    useEffect(() => {
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    const dispatch = useDispatch();
    const users = useSelector((state) => state.admin.users).map((u) => ({
        id: u.id,
        email: u.email,
        username: u.username,
        mobileNumber: u.mobileNumber,
        // role: u.role.name,
        firstName: u.firstName,
        lastName: u.lastName,
        // property: u.property ? u.property.email : '',
        emailVerified: u.emailVerified.toString(),
        mobileVerified: u.mobileVerified.toString(),
        createdAt: u.createdAt.toString().split('T')[0]
    }));

    useEffect(() => {
        setLoading(true);
        dispatch(fetchUsers({ page, pageSize: 100000 })).finally(() =>
            setLoading(false),
        );
        return () => { };
    }, [dispatch, page]);

    useEffect(() => {
        dispatch(fetchUserCount()).then(({ value: count }) =>
            setCount(parseInt(count)),
        );
        return () => { };
    }, [dispatch]);

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
                                                Users
                                                <small className="text-muted"> Users</small>
                                                <div className="card-header-actions">
                                                    <CButton
                                                        tag={Link}
                                                        to={'/admin/users/new'}
                                                        className="btn-ghost-primary h-auto"
                                                        size={'sm'}
                                                        color="primary">
                                                        New User
                                                    </CButton>
                                                </div>
                                            </CCardHeader>
                                            <CCardBody>
                                                <CDataTable
                                                    items={users}
                                                    loading={loading}
                                                    fields={[
                                                        { key: 'email', _classes: 'font-weight-bold' },
                                                        { key: 'username', label: 'Username' },
                                                        'mobileNumber',
                                                        'firstName',
                                                        'lastName',

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
                                                        history.push(`/admin/users/${item.id}`)
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

export default Templates;
