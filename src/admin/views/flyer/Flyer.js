import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLabel,
    CRow,
} from '@coreui/react';
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import { SERVICE_URL } from '../../../constants';
import {
    deleteFlyer,
    fetchFlyer,
} from '../../../redux/actionCreators/adminActionCreators';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"


const Flyer = ({ match }) => {
    const dispatch = useDispatch();

    const [record, setRecord] = useState(null);


    useEffect(() => {
        if (match.params.id)
            dispatch(fetchFlyer(match.params.id)).then(({ value: record }) => {
                console.log('...record..', record);
                const data = {
                    id: record.data.id,
                    ...record.data.attributes
                }
                setRecord(data);
            });
    }, [dispatch, match.params.id]);


    const history = useHistory();

    const onClickDeleteFlyer = useCallback(() => {

        toastr.confirm(
            'Are you sure you want to delete this Flyer?',
            {
                onOk: () => {
                    dispatch(deleteFlyer(match.params.id)).then(() => {
                        history.push('/admin/flyers');
                    });
                },
            },
        );

    }, [dispatch, history, match.params.id, record]);



    if (!record) return null;

    const Flyer = {
        id: record.id,
        description: record.description,
        createdAt: record.createdAt
    };
    const flyerFiles = record.flyer_files.data;
    console.log('...flyer files..', flyerFiles);
    const FlyerDetails = Flyer
        ? Object.entries(Flyer)
        : [
            [
                'id',
                <span>
                    Not
                    found
                </span>,
            ],
        ];
    const uploadedServer = SERVICE_URL.replace('/api', '');
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
                                    <CCol md={12}>
                                        <CCard>
                                            <CCardHeader>
                                                Flyer id: {match.params.id}
                                                <div className="card-header-actions">
                                                    <CButton
                                                        onClick={onClickDeleteFlyer}
                                                        className="btn-ghost-danger h-auto"
                                                        size={'sm'}>
                                                        Delete Flyer
                                                    </CButton>
                                                    {/* <CButton
                                                        tag={Link}
                                                        to={`/admin/edit/flyer/${match.params.id}`}
                                                        className="btn-ghost-warning h-auto"
                                                        size={'sm'}>
                                                        Edit Flyer
                                                    </CButton> */}
                                                </div>
                                            </CCardHeader>
                                            <CCardBody>
                                                <h3>Flyer Details</h3>
                                                <table className="table table-striped table-hover">
                                                    <tbody>
                                                        {FlyerDetails.map(([key, value], index) => {
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
                                                <hr />
                                                <h3> Uploaded Files</h3>
                                                <table className="table table-striped table-hover">
                                                    <tbody>
                                                        {flyerFiles.map((item, index) => {
                                                            return (
                                                                <tr key={index.toString()}>

                                                                    <td>
                                                                        <img src={uploadedServer + item.attributes.fileUrl} height={100} />
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
                        </CContainer>
                    </main>
                </div>
                <TheFooter />
            </div>
        </div>
    );
};

export default Flyer;
