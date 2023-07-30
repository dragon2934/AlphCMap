import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    deleteCampaign,
    fetchCampaign,
} from '../../../redux/actionCreators/adminActionCreators';
import { toastr } from 'react-redux-toastr';

import { TheContent, TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer, CFade } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { icons } from "../../assets/icons"

const ViewCampaign = ({ match }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [campaign, setCampaign] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();



    // Fetch alert
    useEffect(() => {
        if (match.params.id)
            dispatch(fetchCampaign(match.params.id)).then(({ value: campaign }) => {
                const data = campaign.data;
                const campaignData = {
                    id: data.id,
                    subject: data.attributes.CampaignName,
                    templateName: data.attributes.templateName,
                    createdAt: data.attributes.createdAt,
                }
                console.log('..campaignData..', campaignData)
                setCampaign(campaignData);
            });
    }, [dispatch, match.params.id]);



    const onClickDeleteCampaign = useCallback(() => {
        toastr.confirm(
            'Are you sure you want to delete this alert? This action is irreversible!',
            {
                onOk: () => {
                    dispatch(deleteCampaign(match.params.id)).then(() => {
                        history.push('/admin/email-campaigns');
                    });
                },
            },
        );

    }, [dispatch, history, match.params.id]);

    if (!alert) return null;

    return (
        <div className="c-app c-default-layout">
            <TheSidebar />
            <div className="c-wrapper">

                <TheHeader />
                <div className="c-body">
                    <main className="c-main">
                        <CContainer fluid className={'h-100'}>
                            <CRow className="h-100">
                                <CCol md={6}>
                                    <CCard>
                                        <CCardHeader>
                                            {match.params.id
                                                ? `Record id: ${match.params.id}`
                                                : 'New Alert'}
                                            <div className="card-header-actions">
                                                <CButton
                                                    onClick={onClickDeleteCampaign}
                                                    className="btn-ghost-danger h-auto"
                                                    size={'sm'}>
                                                    Delete Campaign
                                                </CButton>
                                            </div>
                                        </CCardHeader>
                                        <CCardBody>
                                            <h3>Campaign Details</h3>
                                            <table className="table table-striped table-hover">
                                                <tbody>
                                                    {campaign ? Object.keys(campaign).map((key) => (
                                                        <tr key={key}>
                                                            <td>{`${key}:`}</td>
                                                            <td>
                                                                <strong>{campaign[key]}</strong>
                                                            </td>
                                                        </tr>
                                                    )
                                                    ) : null
                                                    }
                                                </tbody>
                                            </table>
                                        </CCardBody>
                                        <CCardFooter className="text-right" />
                                    </CCard>
                                </CCol>

                            </CRow>
                        </CContainer>
                    </main>
                </div>
                <TheFooter />
            </div>
        </div>
    );
};

export default ViewCampaign;
