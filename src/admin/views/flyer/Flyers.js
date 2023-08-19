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

    fetchFlyers,
} from '../../../redux/actionCreators/adminActionCreators';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"


const PAGE_SIZE = 10;

const Flyers = () => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [coupons, setCoupons] = useState([]);
    const currentUser = useSelector((state) => state.auth.me);

    useEffect(() => {
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    const dispatch = useDispatch();
    // const Coupons = useSelector((state) => state.admin.Coupons);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchFlyers(currentUser.id, { page, pageSize: 100000 })).then((resp) => {
            console.log('Coupons..' + JSON.stringify(resp));
            const data = resp.value.data;
            const coupons = [];
            data.map(item => {
                coupons.push({
                    id: item.id,
                    ...item.attributes,
                    percentageInDiscount: item.attributes.percentageDiscount > 0 ? parseInt(item.attributes.percentageDiscount * 100) + '%' : ''
                })
            })
            console.log('..after convert..', coupons);
            setCoupons(coupons);
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
                                                Flyers
                                                <small className="text-muted"> Flyers</small>
                                                <div className="card-header-actions">
                                                    <CButton
                                                        tag={Link}
                                                        to={'/admin/flyers/new'}
                                                        className="btn-ghost-primary h-auto"
                                                        size={'sm'}
                                                        color="primary">
                                                        New Flyers
                                                    </CButton>
                                                </div>
                                            </CCardHeader>
                                            <CCardBody>
                                                <CDataTable
                                                    items={coupons}
                                                    loading={loading}
                                                    fields={[
                                                        { key: 'description', label: 'description', _classes: 'font-weight-bold' },
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
                                                        history.push(`/admin/flyers/${item.id}`)
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

export default Flyers;
