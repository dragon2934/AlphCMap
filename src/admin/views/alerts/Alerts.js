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
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {
    fetchAlertCount,
    fetchAlerts,
} from '../../../redux/actionCreators/adminActionCreators';
import Moment from 'moment';


const PAGE_SIZE = 10;

const Alerts = () => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);

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
    const alerts = useSelector((state) => state.admin.alerts).map((u) => ({
        mobileNumber:u.mobileNumber,
        id: u.id,
        sender: u.sender,
        name: u.name,
        createdAt: Moment(u.createdAt.toString()).format('YYYY-MM-DD HH:mm:SS')
    }));

    useEffect(() => {
        setLoading(true);
        dispatch(fetchAlerts({page, pageSize: 1000000})).finally(() =>
            setLoading(false),
        );
        return () => {};
    }, [dispatch, page]);

    useEffect(() => {
        dispatch(fetchAlertCount()).then(({value: count}) =>
            setCount(parseInt(count)),
        );
        return () => {};
    }, [dispatch]);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        Alerts
                        <small className="text-muted"> Alerts</small>
                        <div className="card-header-actions">
                            <CButton
                                tag={Link}
                                to={'/admin/alerts/new'}
                                className="btn-ghost-primary h-auto"
                                size={'sm'}
                                color="primary">
                                New Alert
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={alerts}
                            loading={loading}
                            fields={[
                                {
                                 key: 'mobileNumber', _classes: 'font-weight-bold'},
                                'sender',
                                // 'mobileNumber',
                                'name',
                                'createdAt'
                            ]}
                            hover
                            sorter
                            striped
                            tableFilter={{ 'placeholder': 'Keywords...'}}
                            itemsPerPage = {PAGE_SIZE}
                            pagination
                            clickableRows
                            onRowClick={(item) =>
                                history.push(`/admin/alerts/${item.id}`)
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
    );
};

export default Alerts;
