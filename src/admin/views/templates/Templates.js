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
    fetchTemplates,
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
    const currentUser = useSelector((state) => state.auth.me);
    // console.log('..currentUser..', currentUser);

    useEffect(() => {
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    const dispatch = useDispatch();
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchTemplates(currentUser.id, { page, pageSize: 100000 })).then(resp => {
            console.log('..resp..', resp);
            setTemplates(resp.value.data);
        })
            .finally(() =>
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
                                                Templates
                                                <small className="text-muted"> Templates</small>
                                                <div className="card-header-actions">
                                                    <CButton
                                                        tag={Link}
                                                        to={'/admin/templates/new'}
                                                        className="btn-ghost-primary h-auto"
                                                        size={'sm'}
                                                        color="primary">
                                                        New Template
                                                    </CButton>
                                                </div>
                                            </CCardHeader>
                                            <CCardBody>
                                                <CDataTable

                                                    loading={loading}
                                                    items={templates.map((p) => ({
                                                        id: p.id,
                                                        template_name: p.attributes.template_name,
                                                        subject: p.attributes.subject,
                                                        from_email: p.attributes.from_email,
                                                        from_name: p.attributes.from_name,
                                                        createdAt: p.attributes.createdAt
                                                    }))}
                                                    fields={[
                                                        { key: 'template_name', label: 'Template name', _classes: 'font-weight-bold' },
                                                        { key: 'subject', label: 'Subject' },
                                                        { key: 'from_email', label: 'From Email' },
                                                        { key: 'from_name', label: 'From Name' },
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
                                                        history.push(`/admin/templates/${item.id}`)
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
