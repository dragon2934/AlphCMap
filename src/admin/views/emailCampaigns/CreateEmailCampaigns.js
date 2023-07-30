import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable
} from '@coreui/react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import MapContext from '../../../common/contexts/MapContext/MapContext';
import {
    loadConnected,
    fetchTemplates,
    createCampaigns
} from '../../../redux/actionCreators/adminActionCreators';
import { createAlert } from '../../../redux/actionCreators/alertActionCreators';
import PropertiesMap from '../properties/PropertiesMap';
import { useSelector } from 'react-redux';
import { FormGroup, Input, Label } from 'reactstrap';
import "react-table-v6/react-table.css";
// import utilsTools from '../../../utils/utils';
import { TheSidebar, TheFooter, TheHeader } from '../../containers/index';
import { CContainer } from '@coreui/react';
import '../../../styles/admin/style.scss';
import { convertLocation } from '../../../utils/utils';
import { toastr } from 'react-redux-toastr';
const PAGE_SIZE = 10;
const CreateEmailCampaign = () => {
    const [draw, setDraw] = useState(null);
    const [drawedBefore, setDrawedBefore] = useState(false);
    const [drawing, setDrawing] = useState(false);
    const [properties, setProperties] = useState([]);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [name, setName] = useState('');
    const [feature, setFeature] = useState(null);
    const [loading, setLoading] = useState(true);

    const currentUser = useSelector((state) => state.auth.me);

    const user = useSelector((state) => state.auth.user);
    let userName = '';
    let mobileNumber = '';


    try {
        userName = [user.firstName, user.lastName]
            .filter((i) => i)
            .join(' ')
            .trim();
        if (userName.length < 1) {
            userName = user.username;
        }
        mobileNumber = user.mobileNumber;
        // setSender(userName);
        // console.log('logined user=' + JSON.stringify(user));
    } catch (e) { }

    const [sender, setSender] = useState(userName);
    const [templateId, setTemplateId] = useState(null);
    const [alertNameOthers, setAlertNameOthers] = useState('');
    const [senderMobileNumber, setSenderMobileNumber] = useState(mobileNumber);
    const [selectedPropertyEmail, setSelectedPropertyEmail] = useState([]);
    const { map, clearContext } = useContext(MapContext);
    const dispatch = useDispatch();

    const history = useHistory();

    const [templates, setTemplates] = useState(null);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchTemplates(currentUser.id, { page: 1, pageSize: 100000 })).then(resp => {
            console.log('..resp..', resp.value.data);
            setTemplates(resp.value.data);
        })
            .finally(() =>
                setLoading(false),
            );
        return () => { };
    }, [dispatch]);





    useEffect(() => {
        // if (utilsTools.checkUseLevel(user.role.name) === 1) 
        // {
        dispatch(loadConnected()).then(
            ({ value: properties }) => {
                const data = convertLocation(properties.value);
                console.log('...loadConnected .. properties..', data);
                setProperties(
                    data.map((p) => ({
                        type: 'Feature',
                        properties: p,
                        geometry: {
                            type: 'Point',
                            coordinates: [
                                p.location.longitude,
                                p.location.latitude,
                            ],
                        },
                    })),
                );
            }
        );
        // }

    }, [dispatch]);

    useEffect(() => {
        if (map) {
            const draw = new MapboxDraw({
                controls: {
                    point: false,
                    line_string: false,
                    polygon: false,
                    trash: false,
                    combine_features: false,
                    uncombine_features: false,
                },
            });
            setDraw(draw);

            map.addSource('area', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });
            map.addLayer({
                id: 'area',
                type: 'fill',
                source: 'area',
                layout: {},
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.8,
                },
            });
        }
    }, [clearContext, map]);

    useEffect(() => {
        return () => {
            if (map) {
                map.removeLayer('area');
                map.removeSource('area');
            }
        };
    }, [map]);

    const onClickCreateCampaigns = useCallback(() => {
        if (!templateId) {
            toastr.error('Error', 'Please choose a template');
            return;
        }
        if (selectedProperties.length === 0) {
            toastr.error('Error', 'Please select customer from the map');
            return;
        }
        console.log('selectedProperties=', selectedProperties);
        dispatch(
            createCampaigns({
                templateId: templateId,
                properties: selectedProperties.map((i) => i.properties.id),
                ownerId: currentUser.id,
            }),
        ).then(({ value: campaign }) => {
            console.log('..campaign..', campaign)
            history.push(`/admin/email-campaign/` + campaign.value);
        });
    }, [dispatch, feature, history, name, selectedProperties, alertNameOthers]);


    const toggleDrawing = useCallback(() => {
        if (!drawing) {
            map.addControl(draw, 'top-left');
            draw.changeMode(draw.modes.DRAW_POLYGON);

            setSelectedProperties([]);

            setFeature(null);

            map.getSource('area').setData({
                type: 'FeatureCollection',
                features: [],
            });
        } else {
            const featureCollection = draw.getAll();
            map.getSource('area').setData(featureCollection);

            console.log('11=' + JSON.stringify(properties) + ' 12=' + JSON.stringify(featureCollection));
            setSelectedProperties(
                properties.filter((p) =>
                    booleanPointInPolygon(p, featureCollection.features[0]),
                ),
            );
            /////
            let selected = [];
            selectedProperties.map(property => {
                let columnJson = {
                    "Email": property.properties.email
                }
                selected.push(columnJson)
            });
            console.log(' end drawing 1=' + JSON.stringify(selectedProperties) + ' 2=' + JSON.stringify(selected));
            setSelectedPropertyEmail(selected);
            setFeature(featureCollection.features[0]);

            map.removeControl(draw);
        }

        setDrawedBefore(true);
        setDrawing(!drawing);
    }, [draw, drawing, map, properties]);

    return (
        <div className="c-app c-default-layout">
            <TheSidebar />
            <div className="c-wrapper">

                <TheHeader />
                <div className="c-body">
                    <main className="c-main">
                        <CContainer fluid className={'h-100'}>
                            <div className="content">
                                <CRow >
                                    <CCol xs="4" style={{ paddingBottom: "40px" }}>
                                        <CCard>
                                            <CCardHeader>
                                                New Email Campaign
                                                <div className="card-header-actions" />
                                            </CCardHeader>
                                            <CCardBody>
                                                <CCol xs="12">
                                                    <FormGroup tag="fieldset">
                                                        <Label for="postalCode">Templates</Label>
                                                        {
                                                            templates ? templates.map((item) =>
                                                                <>
                                                                    <FormGroup check>
                                                                        <Label check>
                                                                            <Input
                                                                                className="form-check-input"
                                                                                type="radio"
                                                                                name="templateId"
                                                                                onChange={(e) => setTemplateId(e.target.value)}
                                                                                value={item.id}

                                                                            />
                                                                            {item.attributes.template_name}
                                                                        </Label>
                                                                    </FormGroup>
                                                                </>

                                                            ) : null
                                                        }


                                                    </FormGroup>
                                                </CCol>


                                                <CButton
                                                    block
                                                    color={!drawing ? 'primary' : 'success'}
                                                    onClick={toggleDrawing}>
                                                    {!drawing
                                                        ? drawedBefore
                                                            ? 'Redraw'
                                                            : 'Start Drawing'
                                                        : 'End Drawing'}
                                                </CButton>


                                                {/* <CButton
                                    color="danger"
                                    block
                                    onClick={onClickCreateAlert}>
                                    Send Alert
                                </CButton> */}

                                                {selectedProperties.length > 0 && (
                                                    <>
                                                        <p className="mt-5">
                                                            Send email to the following customers:
                                                        </p>
                                                        <CDataTable
                                                            items={selectedProperties.map((p) => ({
                                                                email: p.properties.email,
                                                            }))}
                                                            loading={loading}
                                                            fields={[
                                                                {
                                                                    key: 'email', _classes: 'font-weight-bold'
                                                                },
                                                            ]}
                                                            hover
                                                            sorter
                                                            striped
                                                            itemsPerPage={PAGE_SIZE}
                                                            pagination

                                                        />
                                                        {/* <CListGroup accent className="mb-3">
                                                            {selectedProperties.map((p) => (
                                                                <CListGroupItem key={p.properties.id}>
                                                                    {p.properties.email}@alphc.com
                                                                </CListGroupItem>
                                                            ))}
                                                        </CListGroup> */}

                                                        <CButton
                                                            color="danger"
                                                            block
                                                            onClick={onClickCreateCampaigns}>
                                                            Send
                                                        </CButton>
                                                    </>
                                                )}
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                    <CCol xs="8">
                                        {/* <div className="h-100 d-flex">
                                            <Map />
                                        </div> */}
                                        <PropertiesMap />
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

export default CreateEmailCampaign;
