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

import {
    deleteTemplate,
    fetchTemplate,
} from '../../../redux/actionCreators/adminActionCreators';
import Header from '../../../site/pages/newHome/Header';
// import ReactHtmlParser from 'react-html-parser';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"

const Template = ({ match }) => {
    const dispatch = useDispatch();

    const [record, setRecord] = useState(null);


    useEffect(() => {
        if (match.params.id)
            dispatch(fetchTemplate(match.params.id)).then(({ value: record }) =>
                setRecord(record.data),
            );
    }, [dispatch, match.params.id]);


    const history = useHistory();

    const onClickDeleteTemplate = useCallback(() => {

        toastr.confirm(
            'Are you sure you want to delete this template? This action is irreversible!',
            {
                onOk: () => {
                    dispatch(deleteTemplate(match.params.id)).then(() => {
                        history.push('/admin/templates');
                    });
                },
            },
        );

    }, [dispatch, history, match.params.id, record]);



    if (!record) return null;

    const template = {
        id: record.id,
        template_name: record.attributes.template_name,
        subject: record.attributes.subject,
        from_email: record.attributes.from_email,
        from_name: record.attributes.from_name,
        template_body: record.attributes.template_body,
        createdAt: record.attributes.createdAt
    };

    const templateDetails = template
        ? Object.entries(template)
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
                                                Template id: {match.params.id}
                                                <div className="card-header-actions">
                                                    <CButton
                                                        onClick={onClickDeleteTemplate}
                                                        className="btn-ghost-danger h-auto"
                                                        size={'sm'}>
                                                        Delete Template
                                                    </CButton>
                                                    <CButton
                                                        tag={Link}
                                                        to={`/admin/edit/templates/${match.params.id}`}
                                                        className="btn-ghost-warning h-auto"
                                                        size={'sm'}>
                                                        Edit Template
                                                    </CButton>
                                                </div>
                                            </CCardHeader>
                                            <CCardBody>
                                                <h3>Template Details</h3>
                                                <table className="table table-striped table-hover">
                                                    <tbody>
                                                        {templateDetails.map(([key, value], index) => {
                                                            return (
                                                                <tr key={index.toString()}>
                                                                    <td>{`${key}:`}</td>
                                                                    <td>
                                                                        <strong>{
                                                                            key === 'template_body' ? <div
                                                                                dangerouslySetInnerHTML={{ __html: value }}
                                                                            /> : value

                                                                        }</strong>
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

export default Template;
