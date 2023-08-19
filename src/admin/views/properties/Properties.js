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
    fetchProperties,
    fetchPropertyCount,
} from '../../../redux/actionCreators/adminActionCreators';
import Header from '../../../site/pages/newHome/Header';
// import utilsTools from '../../../utils/utils';
const PAGE_SIZE = 20;

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"

const Properties = () => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const user = useSelector((state) => state.auth.me);

    useEffect(() => {
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    const dispatch = useDispatch();
    const properties = useSelector((state) => state.admin.properties);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchProperties({ page, pageSize: 1000000, roleName: user.role.name })).finally(() =>
            setLoading(false),
        );
        return () => { };
    }, [dispatch, page]);

    useEffect(() => {
        dispatch(fetchPropertyCount()).then(({ value: count }) =>
            setCount(parseInt(count)),
        );
        return () => { };
    }, [dispatch]);

    console.log('properties: ', properties);

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
                                                Properties
                                                <small className="text-muted"> Properties</small>
                                                <div className="card-header-actions">
                                                    <CButton
                                                        tag={Link}
                                                        to={'/admin/file-upload'}
                                                        className="btn-ghost-primary h-auto"
                                                        size={'sm'}
                                                        color="primary">
                                                        File Upload
                                                    </CButton> &nbsp;&nbsp;&nbsp;&nbsp;
                                                    {/* <CButton
                                                        tag={Link}
                                                        to={'/admin/properties/new'}
                                                        className="btn-ghost-primary h-auto"
                                                        size={'sm'}
                                                        color="primary">
                                                        New Property
                                                    </CButton> */}
                                                </div>
                                            </CCardHeader>
                                            <CCardBody>
                                                <CDataTable
                                                    items={properties.map((p) => ({
                                                        email: p.attributes.email,
                                                        unitNo: p.attributes.unitNo,
                                                        postalCode: p.attributes.postalCode,
                                                        streetNumber: p.attributes.streetNumber,
                                                        route: p.attributes.route,
                                                        locality: p.attributes.locality,
                                                        city: p.attributes.city,
                                                        country: p.attributes.country,
                                                        createdAt: p.attributes.createdAt.toString().split('T')[0],
                                                        // serial_no: parseInt(p.serial_no),
                                                        location: '[' + p.attributes.location.latitude + ',' + p.attributes.location.longitude + ']'
                                                    }))}
                                                    loading={loading}
                                                    fields={[
                                                        { key: 'email', _classes: 'font-weight-bold' },
                                                        'unitNo',
                                                        'postalCode',
                                                        'streetNumber',
                                                        'route',
                                                        'locality',
                                                        'city',
                                                        'country',
                                                        'createdAt'
                                                    ]}
                                                    hover
                                                    striped
                                                    sorter
                                                    // columnFilter
                                                    tableFilter={{ 'placeholder': 'Keywords...' }}
                                                    itemsPerPage={PAGE_SIZE}
                                                    pagination
                                                    clickableRows
                                                    onRowClick={(item) =>
                                                        history.push(`/admin/properties/${item.id}`)
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

export default Properties;
