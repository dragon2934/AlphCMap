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
    fetchCityCount,
    fetchCities,
} from '../../../redux/actionCreators/adminActionCreators';
import Header from '../../../site/pages/newHome/Header';

const PAGE_SIZE = 10;

const Cities = () => {
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [cities,setCities] = useState([]);


    useEffect(() => {
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    const dispatch = useDispatch();
    // const cities = useSelector((state) => state.admin.cities);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchCities({page, pageSize: 100000})).then( ({value:resp_cities}) =>{
            console.log('cities..' + JSON.stringify(resp_cities));
            setCities(resp_cities);
        }).finally(() =>
            setLoading(false),
        );
        return () => {};
    }, [dispatch, page]);

    useEffect(() => {
        dispatch(fetchCityCount()).then(({value: count}) =>
            setCount(parseInt(count)),
        );
        return () => {};
    }, [dispatch]);

    // console.log('itemsPerPageSelect = ' + PAGE_SIZE);
    return (
        <main>
        <Header />
        <div className="content">
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        Cities
                        <small className="text-muted"> Cities</small>
                        <div className="card-header-actions">
                            <CButton
                                tag={Link}
                                to={'/admin/cities/new'}
                                className="btn-ghost-primary h-auto"
                                size={'sm'}
                                color="primary">
                                New City
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={cities}
                            loading={loading}
                            fields={[
                                {key: 'short_name', _classes: 'font-weight-bold'},
                                {key: 'full_name', label: 'Full Name'},
                                'memo',
                                { key:'totol_properties', label:' Total Properties'},
                                'createdAt'
                            ]}
                            hover
                            striped
                            sorter
                            tableFilter={{ 'placeholder': 'Keywords...'}}
                            itemsPerPage = {PAGE_SIZE}
                            pagination
                            clickableRows
                            onRowClick={(item) =>
                                history.push(`/admin/cities/${item.id}`)
                            }
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        </div>
        </main>
    );
};

export default Cities;
