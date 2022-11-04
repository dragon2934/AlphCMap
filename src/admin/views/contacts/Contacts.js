import {
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
import {useHistory, useLocation} from 'react-router-dom';
import {
    fetchContactCount,
    fetchContacts,
} from '../../../redux/actionCreators/adminActionCreators';

const PAGE_SIZE = 10;

const Contacts = () => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);

    const pageChange = (newPage) => {
        if (!newPage) {
            history.push(`/admin/contacts?page=1`);
        } else {
            currentPage !== newPage &&
                history.push(`/admin/contacts?page=${newPage}`);
        }
    };

    useEffect(() => {
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.admin.contacts);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchContacts({page, pageSize: 1000000})).finally(() =>
            setLoading(false),
        );
        return () => {};
    }, [dispatch, page]);

    useEffect(() => {
        dispatch(fetchContactCount()).then(({value: count}) =>
            setCount(parseInt(count)),
        );
        return () => {};
    }, [dispatch]);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        Contacts
                        <small className="text-muted"> Contacts</small>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={contacts}
                            loading={loading}
                            fields={[
                                {key: 'email', _classes: 'font-weight-bold'},
                                'name',
                                'phone',
                                'createdAt',
                            ]}
                            hover
                            striped
                            sorter
                            tableFilter={{ 'placeholder': 'Keywords...'}}
                            itemsPerPage = {PAGE_SIZE}
                            pagination
                            clickableRows
                            onRowClick={(item) =>
                                history.push(`/admin/contacts/${item.id}`)
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

export default Contacts;
