import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLabel,
    CRow,
} from '@coreui/react';
import React, {useCallback, useContext, useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import {useHistory} from 'react-router';
import {Link} from "react-router-dom";

import {
    deleteCity,
    fetchCity,
} from '../../../redux/actionCreators/adminActionCreators';
import Header from '../../../site/pages/newHome/Header';

const City = ({match}) => {
    const dispatch = useDispatch();

    const [record, setRecord] = useState(null);


    useEffect(() => {
        if (match.params.id)
            dispatch(fetchCity(match.params.id)).then(({value: record}) =>
                setRecord(record),
            );
    }, [dispatch, match.params.id]);


    const history = useHistory();

    const onClickDeleteCity = useCallback(() => {

            toastr.confirm(
                'Are you sure you want to delete this city?',
                {
                    onOk: () => {
                        dispatch(deleteCity(match.params.id)).then(() => {
                            history.push('/admin/cities');
                        });
                    },
                },
            );
        
    }, [dispatch, history, match.params.id, record]);



    if (!record) return null;

    const city = {
        id: record.id,
        short_name: record.short_name,
        full_name: record.full_name,
        memo: record.memo,
        createdAt:record.createdAt
    };

    const cityDetails = city
        ? Object.entries(city)
        : [
              [
                  'id',
                  <span>
                        Not
                      found
                  </span>,
              ],
          ];

    return (
        <main>
        <Header />
        <div className="content">
        <CRow>
            <CCol md={12}>
                <CCard>
                    <CCardHeader>
                        City id: {match.params.id}
                        <div className="card-header-actions">
                            <CButton
                                onClick={onClickDeleteCity}
                                className="btn-ghost-danger h-auto"
                                size={'sm'}>
                                Delete City
                            </CButton>
                            <CButton
                                tag={Link}
                                to={`/admin/edit/city/${match.params.id}`}
                                className="btn-ghost-warning h-auto"
                                size={'sm'}>
                                Edit City
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <h3>City Details</h3>
                        <table className="table table-striped table-hover">
                            <tbody>
                                {cityDetails.map(([key, value], index) => {
                                    return (
                                        <tr key={index.toString()}>
                                            <td>{`${key}:`}</td>
                                            <td>
                                                <strong>{value}</strong>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CCardBody>
                </CCard>
            </CCol>
           
        </CRow>
        </div>
        </main>
    );
};

export default City;
