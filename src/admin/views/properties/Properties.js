import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
} from '@coreui/react';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory, useLocation} from "react-router-dom";
import {
    fetchProperties,
    fetchPropertyCount,
} from '../../../redux/actionCreators/adminActionCreators';
import Header from '../../../site/pages/newHome/Header';
// import utilsTools from '../../../utils/utils';
const PAGE_SIZE = 20;

const Properties = () => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    const dispatch = useDispatch();
    const properties = useSelector((state) => state.admin.properties);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchProperties({page, pageSize: 1000000,roleName:user.role.name})).finally(() =>
            setLoading(false),
        );
        return () => {};
    }, [dispatch, page]);

    useEffect(() => {
        dispatch(fetchPropertyCount()).then(({value: count}) =>
            setCount(parseInt(count)),
        );
        return () => {};
    }, [dispatch]);

    console.log('properties: ', properties);

    return (
        <main>
        <Header />
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
                           <CButton
                                tag={Link}
                                to={'/admin/properties/new'}
                                className="btn-ghost-primary h-auto"
                                size={'sm'}
                                color="primary">
                                New Property
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={properties.map((p) => ({
                                ...p,
                                createdAt:p.createdAt.toString().split('T')[0],
                                serial_no: parseInt(p.serial_no),
                                location: '[' + p.location.latitude  + ',' + p.location.longitude+']'
                            }))}
                            loading={loading}
                            fields={[
                                {key: 'address', _classes: 'font-weight-bold'},
                                'area',
                                'serial_no',
                                'acreage',
                                'location',
                                'createdAt'
                            ]}
                            hover
                            striped
                            sorter
                            // columnFilter
                            tableFilter={{ 'placeholder': 'Keywords...'}}
                            itemsPerPage = {PAGE_SIZE}
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
        </main>
    );
};

export default Properties;
